# 鸣潮回合制 · test.5

最新测试版：[v3.0.0-test.5](https://github.com/Whirock/Wuwa-battlesystem-testversion/releases/tag/v3.0.0-test.5)。下载该页完整离线 ZIP；test.4 和更早版本保留。

战斗界面与文案测试版。数值和战斗机制沿用 test.4；9 种角色配置、61 张主动卡，支持离线游玩。

## 开始

完整解压后打开 index.html。Windows 也可双击「启动遭遇演算.cmd」。无需安装依赖或联网；请保留整个文件夹。

## 本次更新

- 放大角色，调整双方站位；大体型头目等比适配战场
- 右侧同时显示四名队员的 HP、SP、BP、共鸣能量与状态；详细数值点击「属性」
- 技能说明只保留效果、伤害倍率、共振削减与目标；费用和冷却留在菜单
- 效果说明跟随 BP、形态、分支更新，倍率用百分比表示
- 精简危险提示、状态、记录、帮助和设置；完整机制见 docs/player-rules-detail.txt

## 操作

点击当前角色或按 Enter 打开菜单。↑↓ 选择，Enter 确认，Esc 返回。选择 BP 后再选目标，取消不消耗资源。每人每轮行动一次，SP 不自然恢复。

素材工作台支持本地图片、背景、音频和项目导入导出。test.5 使用独立存储，不覆盖 test.4。旧项目可导入；战局须通过当前版本校验。

## 验证与边界

测试明细见「测试报告.txt」和 docs/test5-independent-qa.md。真实云浏览器截图与自动化规则、DOM 验证分别记录。Windows 双击、实际音频播放、真人乐趣和最终平衡未作本次验收。

无妄者当前沿用首版待机动作；投射物仍是可替换机制示意。原 160 张 PNG 保持不变。非官方实验，角色及素材权利归原权利人。

## 开发复测

需要 Node.js 20+、Python 3.10+ 和 Pillow。安装固定测试依赖后运行：

npm ci --ignore-scripts --prefix tests/independent/v02
node tests/v05/run_all.cjs
python tools/verify_publication.py

包内仅含运行程序、素材、公开实现说明和可复现测试，不含私人研究或完整设计框架。

## 发布快照说明

Release 的完整离线 ZIP 保留审核冻结时的原始字节和内部校验。包内 candidate/unpublished 字段记录冻结时点，不表示当前 GitHub Release 状态。仓库仅 README、VERSION、PUBLICATION_CHECKS 和对应 SHA256SUMS 补充发布信息；运行程序、素材和测试与冻结包完全一致。发布状态以以上 Release 页面为准。
