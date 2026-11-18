/**
 * rpsluna 全系统健康体检与依赖寻址诊断脚本 (Plugin Doctor)
 * 用法: node tools/check-plugins.js
 */

const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.resolve(__dirname, '..')
const RPSLUNA_DIR = path.resolve(ROOT_DIR, 'external/rpsluna')

const PLUGINS = [
  { name: 'core', desc: '核心服务与调度状态机' },
  { name: 'adapter-satori-command', desc: 'Satori聊天指令与原生按钮适配器' },
  { name: 'adapter-buttons', desc: '纯按键与UI兜底输入驱动' },
  { name: 'adapter-window', desc: '窗口捕获推流网关' },
  { name: 'strategy-markov', desc: '马尔可夫博弈策略' },
  { name: 'strategy-all', desc: 'Iocaine博弈大师与作弊彩蛋' },
  { name: 'strategy-llm', desc: '大模型读心术与心理战' },
  { name: 'renderer-portal', desc: '独立端口公网Web竞技场' },
  { name: 'renderer-console', desc: '控制台监控扩展' },
]

console.log('===========================================================')
console.log('🩺 koishi-bundle-rpsluna 整合包环境全景健康体检')
console.log('===========================================================\n')

let passedCount = 0
let totalChecks = 0

function check(title, fn) {
  totalChecks++
  process.stdout.write(`[${totalChecks.toString().padStart(2, '0')}] ${title.padEnd(42, ' ')} ... `)
  try {
    const result = fn()
    if (result === false) {
      console.log('\x1b[31m❌ FAILED\x1b[0m')
      return false
    }
    const extra = typeof result === 'string' ? ` (\x1b[36m${result}\x1b[0m)` : ''
    console.log(`\x1b[32m✅ PASSED\x1b[0m${extra}`)
    passedCount++
    return true
  } catch (err) {
    console.log(`\x1b[31m❌ FAILED\x1b[0m: ${err.message}`)
    return false
  }
}

// 1. 检查根目录 node_modules 与 Koishi 核心
check('Koishi 核心依赖安装状态', () => {
  const koishiPkg = path.resolve(ROOT_DIR, 'node_modules/koishi/package.json')
  if (!fs.existsSync(koishiPkg)) return false
  const pkg = JSON.parse(fs.readFileSync(koishiPkg, 'utf-8'))
  return `v${pkg.version}`
})

// 2. 检查 external/rpsluna 工作区联接
check('external/rpsluna 工作区挂载状态', () => {
  if (!fs.existsSync(RPSLUNA_DIR)) return false
  const stat = fs.lstatSync(RPSLUNA_DIR)
  const isJunctionOrDir = stat.isSymbolicLink() || stat.isDirectory()
  return isJunctionOrDir ? 'Junction OK' : false
})

// 3. 检查 rpsluna 内部 node_modules 寻址联接
check('rpsluna 内部依赖反向联接 (node_modules)', () => {
  const rpsModules = path.resolve(RPSLUNA_DIR, 'node_modules')
  if (!fs.existsSync(rpsModules)) return false
  return 'Junction OK'
})

// 4. 逐一检查 8 个子插件对 koishi 的向上寻址能力
console.log('\n📦 正在逐一验证 8 个插件的 Node.js 模块寻址链路:')
for (const p of PLUGINS) {
  const pkgDir = path.resolve(RPSLUNA_DIR, 'packages', p.name)
  const srcIndex = path.resolve(pkgDir, 'src/index.ts')

  check(`  └─ 插件: ${p.name.padEnd(24, ' ')}`, () => {
    if (!fs.existsSync(srcIndex)) {
      throw new Error(`找不到入口源码: ${srcIndex}`)
    }
    // 关键：模拟 Node.js 在插件真实物理路径下 require.resolve('koishi')
    const resolvedKoishi = require.resolve('koishi', { paths: [path.dirname(srcIndex), pkgDir] })
    return 'Koishi 寻址畅通'
  })
}

// 5. 检查配置文件
console.log('\n⚙️ 正在检查整合包配置系统:')

check('koishi.yml 配置文件与彩蛋端口 (51498)', () => {
  const ymlPath = path.resolve(ROOT_DIR, 'koishi.yml')
  if (!fs.existsSync(ymlPath)) return false
  const content = fs.readFileSync(ymlPath, 'utf-8')
  if (!content.includes('51498')) return false
  return 'port: 51498'
})

check('.env 公开示范配置文件', () => {
  const envPath = path.resolve(ROOT_DIR, '.env')
  if (!fs.existsSync(envPath)) return false
  return 'OK'
})

check('.env.local 私密大模型凭证覆盖', () => {
  const localEnvPath = path.resolve(ROOT_DIR, '.env.local')
  if (!fs.existsSync(localEnvPath)) {
    return '未检测到 .env.local，大模型将降级为启发式'
  }
  const content = fs.readFileSync(localEnvPath, 'utf-8')
  if (content.includes('sk-')) {
    return '已配置真实 NewAPI Key'
  }
  return '已创建但未包含 Key'
})

// 6. 检查 Python YOLO 检测器模型状态
console.log('\n👁️ 正在检查视觉伴侣工具 (window_detector):')
check('YOLO11 ONNX 手势检测模型 (yolo_rps.onnx)', () => {
  const modelPath = path.resolve(RPSLUNA_DIR, 'tools/window_detector/models/yolo_rps.onnx')
  if (!fs.existsSync(modelPath)) return '未下载 (运行 detector.py 时将自动下载)'
  const sizeMb = (fs.statSync(modelPath).size / 1024 / 1024).toFixed(1)
  return `${sizeMb} MB 就绪`
})

// 7. 汇总报告
console.log('\n===========================================================')
if (passedCount === totalChecks) {
  console.log(`🎉 完美！全部 ${passedCount}/${totalChecks} 项健康检查全部通过！整合包处于最佳就绪状态！`)
} else {
  console.log(`⚠️ 体检完成: 通过 ${passedCount}/${totalChecks} 项，请检查上述标记为 FAILED 的条目。`)
}
console.log('===========================================================')
