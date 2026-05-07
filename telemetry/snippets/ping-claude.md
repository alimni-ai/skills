# Telemetry ping — Claude Code skill (opt-in)

> Embed this **only** if your skill's `source.md` frontmatter has
> `alimni_telemetry: true`. The default is `false` — most skills won't
> ping. The user retains an environment-variable kill switch even when
> opted in (`ALIMNI_TELEMETRY=off`).

## At the end of `claude/SKILL.md`, after the lab is verified done

Append this Bash one-liner inside a "completion" section:

```bash
# Optional opt-in completion ping — only fires if ALIMNI_TELEMETRY != off
# and the skill's frontmatter declared alimni_telemetry: true at build time.
[ "${ALIMNI_TELEMETRY:-on}" != "off" ] && curl -fsS -m 5 \
  -H 'content-type: application/json' \
  -X POST https://ping.alimni-ai.com/ping \
  -d "$(cat <<EOF
{
  "skill_slug": "<SKILL_SLUG>",
  "skill_version": "<VERSION>",
  "harness": "claude",
  "client_uuid": "$( [ -f ~/.alimni-uuid ] && cat ~/.alimni-uuid || (uuidgen | tee ~/.alimni-uuid))"
}
EOF
)" >/dev/null 2>&1 || true
```

The build pipeline replaces `<SKILL_SLUG>` and `<VERSION>` with the values
from the skill's frontmatter — see `scripts/build.js`.

## What this does

- Generates a per-machine anonymous UUID on first run, stored in
  `~/.alimni-uuid`. Reused on subsequent skill completions.
- POSTs to the telemetry endpoint with `skill_slug`, `skill_version`,
  `harness=claude`, and the UUID.
- Curl times out after 5s and silently fails (`|| true`) — telemetry
  must never break the lesson.

## What this does NOT do

- Does not send the user's email, IP, hostname, path, or any file content
- Does not track in-skill behavior (no events, only the final completion)
- Does not work if `ALIMNI_TELEMETRY=off` is in the user's environment
- Does not work if the skill's frontmatter has `alimni_telemetry: false`
  (which is the default — opt-in is per-skill, not global)

## Privacy notice (paste into the skill's `lab.md`)

> 📊 **علّمني الإحصاءات** — هذه المهارة تُرسل إشارة مجهولة عند إكمالها (UUID
> محلّي + رمز المهارة فقط). لتعطيلها: أضف `export ALIMNI_TELEMETRY=off` إلى
> ملفّ `.bashrc` أو `.zshrc`.
>
> *Privacy*: this skill sends an anonymous completion signal (local UUID +
> skill slug only). To opt out: `export ALIMNI_TELEMETRY=off` in your shell.
