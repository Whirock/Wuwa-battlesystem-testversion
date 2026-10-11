# test.8 UI 图标使用范围与保留原因

核对日期：2026-10-11。此文件描述test.8的图标接入。用户已要求GitHub预发布，实际完成以远端回执为准；用户指令不等于权利人的版权许可，也不表示整套UI已全部替换为原作素材。

## 已使用：14 张原图

原图文件均保持下载字节、原有 alpha、色彩、方向和比例；只在 CSS 中等比显示。每张文件的公开来源、语义、尺寸、SHA-256 与版权说明见 `SOURCES.json`。运行时只请求 `assets/ui-icons/` 中的固定本地文件，不联网热链。

- 属性 6 张：冷凝/Ice、热熔/Fire、导电/Thunder、气动/Wind、衍射/Light、湮灭/Dark。统一使用 128×128 的 IconElementRound 家族；不混用 44×44 版本。
- 职责 1 张：治疗 → RoleLabelA1「生存治疗」。仅表示治疗职责，项目具体条件仍以定位文字为准。
- 数值属性 6 张：HP → LifeMax；ATK → Atk；DEF → Def；CR → Crit；CDMG → CritDamage；ER → EnergyEfficiency。
- 状态 1 张：护盾值 → Sheild（上游字段原拼写）。仅当运行状态 `shield === true` 时，由调用处映射成 `shield` 图标键。覆盖 barrier、chisa_shield 和自建 shield 的吸收点数；不根据名字中含“盾”或“保护”猜测。

## 当前界面入口盘点

1. 编队角色卡、快速选人、漂泊者属性切换：六属性使用原图。原图不可用则同语义的项目 SVG 接替。
2. 编队角色卡职责、定位详情：以下 16 种项目职责中，仅「治疗」用原图，其余 15 种仍使用项目 SVG。已有相邻文字保留；图标为装饰时不重复朗读。
3. 战斗队伍卡的八项基础属性展开区：已匹配的六项使用原图并保留文字标签。SP 与 SPD 仍显示原文字。
4. 队伍与敌人状态角标：真实护盾点数用护盾原图；其他状态保留此前文字/符号及完整 tooltip、aria 描述。12 项优先显示、更多入口、全部状态分页、到期提醒与排序逻辑均不由图标库改变。
5. 定位详情的数值列表：仅在调用处接入 `UiIcons.stat` 的已验证六项显示原图；SP/SPD 不强配。
6. 玩家创建的元素下拉、元素文字预览、八属性输入及技能配方控件：原有文字和原生表单控件保留。该类元素当前没有“待替换的小图标”，不通过 DOM 全局扫描塞图。
7. HP/SP/BP/能量/共振槽、伤害数字、行动菜单与确认/返回/排序/移除/关闭/帮助/声音等通用控制：保留项目文字、几何图形或原生控件。没有为它们套角色专属技能图。
8. 角色立绘、动作图、头像、敌人、背景、地图与创建器组件不属于本 UI 图标替换；本次未重绘或替换这些资产。

## 16 种职责的逐项决策

| 项目职责 | 当前图形 | 原因 |
| --- | --- | --- |
| 击破 | 项目 SVG | 谐度破坏增幅/偏谐累积/震谐响应为更窄原作机制，不等于项目所有击破 |
| 伤害 | 项目 SVG | 主力输出、普攻伤害、解放伤害均比通用伤害窄 |
| 保护 | 项目 SVG | 护盾值图不等于格挡、改向、免死及所有保护 |
| 协同 | 项目 SVG | 快速协奏不等于协同攻击；不借用特定角色技能图 |
| 范围 | 项目 SVG | 尚无同语义通用原作标签 |
| 支援 | 项目 SVG | 伤害加深等只覆盖部分支援能力 |
| 治疗 | 原作 A1 | 生存治疗语义匹配，仍保留项目条件文字 |
| 归群 | 项目 SVG | 本项目归群组织扩散目标，不取消或牵引行动；不用原作牵引图 |
| 异常 | 项目 SVG | 聚爆/虚湮只是特定异常，不能代表所有异常 |
| 连击 | 项目 SVG | 普攻伤害图不是连击次数或真实多击 |
| 持续 | 项目 SVG | 尚无同语义通用原作标签 |
| 控序 | 项目 SVG | 控序不等于牵引、束缚或中断 |
| 爆发 | 项目 SVG | 爆发不等于所有共鸣解放伤害 |
| 形态 | 项目 SVG | 不将任一角色专属形态技能扩作通用 |
| 转换 | 项目 SVG | 项目异常转换没有已核实同语义通用原图 |
| 供SP | 项目 SVG | SP 为项目资源，共鸣效率/能量图不能替代 |

## 状态类覆盖与保留

- 已使用护盾图：barrier、chisa_shield，以及结构化自建 shield。识别依据真实状态 `shield` 字段，不仅是状态键。
- 原有五种异常：spectro_frazzle（光噪）、aero_erosion（风蚀）、electro_flare（电磁）、fusion_burst（聚爆）、havoc_bane（虚湮），保持现有状态文字/符号。已找到的某些同名原作“职责标签”不自动视为状态图标。
- 通用状态：guard、counter_stance、stasis_delay、interruption_guard、damage_boost、attack_link、energy_drain、stun，以及显示层的 charge、aim、cutline、brace 等提示，保留项目表示。防御/格挡不冒充吸收护盾。
- 角色机制状态：rupture_shift、strain_shift、amy_quick、amy_escort、lynae_cruise、lynae_chase、lynae_paint、lynae_r_support、lynae_empowered、mornye_air、mornye_field、mornye_field_def、mornye_guard、mornye_taunt、mornye_bound、mornye_observation、mornye_interference、mornye_support、denia_group、denia_spill、denia_field、chisa_saw、chisa_unravel_mark、chisa_wanlv、spectro_echo_hold、role_slow、dark_surge、havoc_field、aero_cap_aura、critical_resonance、electro_relay、electro_marrow，保留既有状态文字/符号与描述，不把角色技能按钮图冒充其派生状态图。
- 创建器 16 类效果：heal_on_hit、group、splash、convert、guard、taunt、heal、shield、sp_restore、anomaly、slow、def_down、delay、damage_boost、coordinated、conditional_sp。只有实际生成的吸收护盾状态使用新护盾图；即时效果没有强行新增持久状态角标。其他生成状态维持原符号。动态容量/上限状态和未知合法扩展键均安全回退到调用处提供的原文字。

## 已找到但不能乱用

- RoleLabelA2 主力输出、A3 快速协奏、B1 普攻伤害、B4 解放伤害、C1 牵引、C7 伤害加深、D10 解放伤害加深、E1 虚湮、E5 聚爆、G1 偏谐值累积效率、G2 谐度破坏增幅、H1 集谐响应、I2 震谐响应，不强套上述更宽或不同语义的项目职责。
- `redspeed` 的原作语义为共鸣技能伤害加成，不能当 SPD；`greenenergy` 是共鸣效率，不能当 SP。
- `redgeneral` 通用伤害加成、`greencure` 治疗加成是数值属性，不等于所有伤害/治疗职责；当前无对应独立显示位，不增加闲置运行资产。
- 已核对若干菜单候选的真实像素与文件名不一致：SP_BtnBack 是底板、SP_BtnMore 是圆环、SP_ComIconQuestion 是眼形图；因此不凭名字替换返回/更多/帮助。声音/静音候选也未获得足够的上下文语义确认。
- 迅刀/佩枪/长刃/音感仪的已保存普通攻击图不等于任意技能、泛化输出职责或本项目自建武器系统。

## 接口与安全回退

`UiIcons.element(key, options)`、`role`、`stat`、`status` 与 `html(kind, key, options)` 返回已转义 HTML。`describe` 提供只读语义与是否有原图；`keys` 只列已核实原图键。未来扩展应只修改固定白名单，并补齐来源清单和测试。

- `stat` 接受大小写英文键；调用处仅在 `describe('stat', key).src` 存在时插入原图，保留原文字标签。
- `status` 当前仅有明确的 `shield` 原图键。调用处基于 `raw.shield === true` 选择它，并传入原 `fallbackText`。不从用户自填名称或未经验证状态猜测图形。
- 图像载入前、载入失败、离线漏文件时，备用图形仍在原尺寸位置，不改 src、不循环重试、不转向远程站点。随后成功加载可恢复原图。
- 高对比度 forced-colors 使用可见的同语义项目备用图形；保留可访问名称。
- 对已有可访问名称的按钮/相邻文字使用 `decorative: true`；独立图标默认提供语义 title、aria-label 和图片 alt。
- 自定义 src、内联事件和任意 HTML 不能通过 options 注入。未知键、原型同名键和缺失类别使用中性的安全 fallback。

## 验证与权利边界

`node tests/v08/icons_contracts.cjs` 覆盖六元素、职责/属性/护盾语义、不误配、加载与缺失回退、缓存、动态插入、注入防护、离线路径、来源清单和原字节 SHA。jsdom 事件测试不等于浏览器解码或视觉验收，真实浏览器检查另行记录。

这些是鸣潮原作 UI 图像，版权归 Kuro Games 及各自权利人；项目 SVG fallback 与原作图像是不同来源。恢复副本和公开下载地址均不构成公开再分发许可。用户已要求向Whirock/Wuwa-battlesystem-testversion发布v3.0.0-test.8预发布版；该指令不等于第三方权利人的版权许可，也不表示已经取得公开再分发许可。SOURCES.json的publication_authorized仅表示权利人再分发许可的确认状态，user_publication_requested单列用户发布请求。实际上传和发布状态以远端回执为准。
