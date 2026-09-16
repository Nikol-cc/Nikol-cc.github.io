import fs from 'fs-extra'

const repo = 'daily-notes'
const sourceNotes = fs.readJSONSync('./scripts/daily-notes-source.json')
const grouped = sourceNotes.reduce((groups, note) => {
  const year = new Date(note.created_at).getFullYear()
  ;(groups[year] ||= []).push(note)
  return groups
}, {})

function formatTime(time) {
  return time.replace(/T.*$/, '')
}

function removeLegacyAuthorLinks(content) {
  return (
    content
      // 原站图片没有同步到本站时，保留图片说明，避免页面继续请求原作者资源。
      .replace(/!\[([^\]]*)\]\([^)]*maomao1996[^)]*\)/gi, '$1')
      // 日常笔记之间的引用改为本站对应页面。
      .replace(
        /https:\/\/github\.com\/maomao1996\/daily-notes\/issues\/(\d+)/g,
        '/daily-notes/issue-$1',
      )
      // 其余属于原作者仓库的地址统一指向 Nikol-cc GitHub 主页，避免伪造不存在的同名仓库。
      .replace(/https:\/\/github\.com\/maomao1996[^)\s>]*/gi, 'https://github.com/Nikol-cc')
      .replace(
        /https:\/\/raw\.githubusercontent\.com\/maomao1996[^)\s>]*/gi,
        'https://github.com/Nikol-cc',
      )
      .replace(
        /https:\/\/cdn\.jsdelivr\.net\/gh\/maomao1996[^)\s>]*/gi,
        'https://github.com/Nikol-cc',
      )
      .replace(
        /https:\/\/notes\.fe-mm\.com[^)\s>]*/gi,
        'https://yangs-lab.nikola-942.chatgpt.site/',
      )
      .replace(/github\.com\/maomao1996/gi, 'github.com/Nikol-cc')
      .replace(/maomao1996\/mm-notes/gi, 'Nikol-cc/nikols-lab')
      .replace(/茂茂物语/g, "Nikol's Lab")
  )
}

function generateIssueMarkdown(issue) {
  const content = removeLegacyAuthorLinks(
    issue.body.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, ''),
  )
    .replace(
      /https:\/\/github\.com\/maomao1996\/daily-notes\/issues\/(\d+)/g,
      '/daily-notes/issue-$1',
    )
    .replace(/https:\/\/notes\.fe-mm\.com\/daily-notes\/?/g, '/daily-notes/')

  const finalContent = content.endsWith('\n') ? content : `${content}\n`
  fs.writeFileSync(`./docs/${repo}/issue-${issue.number}.md`, finalContent, 'utf8')
}

function generateIndexFile(data) {
  const issueYearGroups = Object.entries(data).sort(([year1], [year2]) => year2 - year1)
  const total = issueYearGroups.reduce((sum, [, issues]) => sum + issues.length, 0)
  const latest = issueYearGroups[0]?.[1]?.[0]?.created_at

  const content = `# Daily Notes 日常笔记

日常笔记记录（零零散散啥都记系列）

> 内容整理自公开技术笔记，已移除前端专题，保留通用开发、系统与工具实践。

共计 **${total}** 篇（上次更新: ${formatTime(latest)}）

${issueYearGroups
  .map(
    ([year, issues]) => `## ${year} 年 (共计 ${issues.length} 篇)

${issues
  .map(
    (issue, index) =>
      `${index + 1}. ${formatTime(issue.created_at)} —— [${issue.title}](/daily-notes/issue-${
        issue.number
      })`,
  )
  .join('\n\n')}`,
  )
  .join('\n\n')}
`

  fs.writeFileSync('./docs/daily-notes/index.md', content, 'utf8')

  const sidebar = issueYearGroups.map(([year, issues]) => ({
    text: `${year} 年`,
    collapsed: false,
    items: issues.map((issue) => ({
      text: issue.title,
      link: `/daily-notes/issue-${issue.number}`,
    })),
  }))

  fs.writeJSONSync('./scripts/daily-notes.json', sidebar, {
    spaces: 2,
    encoding: 'utf8',
  })
}

fs.emptyDirSync('./docs/daily-notes')
for (const issue of sourceNotes) generateIssueMarkdown(issue)
generateIndexFile(grouped)

console.log(`Filtered daily notes generated successfully: ${sourceNotes.length} notes`)
