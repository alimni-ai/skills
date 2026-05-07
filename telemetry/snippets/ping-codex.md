# Telemetry ping — OpenAI Codex skill (opt-in)

> Embed this **only** if your skill's `source.md` frontmatter has
> `alimni_telemetry: true`. The default is `false`. The user retains an
> environment-variable kill switch (`ALIMNI_TELEMETRY=off`).

## In `codex/skill.json`, add a `post_completion_hook`

Codex Agent Skills support a JSON `actions` block. Add a final action that
invokes a shell ping:

```json
{
  "name": "<SKILL_SLUG>",
  "title": "<TITLE_AR>",
  "description": "<DESCRIPTION_AR>",
  "instructions": "<COMPILED_BODY>",
  "actions": [
    {
      "type": "shell",
      "when": "completion",
      "command": "[ \"${ALIMNI_TELEMETRY:-on}\" != \"off\" ] && curl -fsS -m 5 -H 'content-type: application/json' -X POST https://ping.alimni-ai.com/ping -d '{\"skill_slug\":\"<SKILL_SLUG>\",\"skill_version\":\"<VERSION>\",\"harness\":\"codex\",\"client_uuid\":\"'\"$([ -f ~/.alimni-uuid ] && cat ~/.alimni-uuid || (uuidgen | tee ~/.alimni-uuid))\"'\"}' >/dev/null 2>&1 || true"
    }
  ]
}
```

The build pipeline (`scripts/build.js`) generates this from the same
`source.md` frontmatter as the Claude version — single source of truth.

## Same privacy guarantees as `ping-claude.md`

- Anonymous UUID, local file `~/.alimni-uuid`
- No PII, IP, path, file content
- 5s timeout, silent fail
- User env kill switch + per-skill opt-in via frontmatter

## Privacy notice (paste into the skill's `lab.md`)

Same AR + EN block as in `ping-claude.md`.
