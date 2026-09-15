export type CommissionMode = 'rate' | 'amount'
export type CommissionLevel = 'levelOne' | 'levelTwo' | 'top'
export type CommissionPayout = { level: CommissionLevel; mode: CommissionMode; value: number | null; partnerOnly: boolean }
export type CommissionGroup = { participant: string; payouts: CommissionPayout[] }
export type Rule = { id: number; name: string; scope: string; selectedCourses: string[]; attribution: string; settlement: string; enabled: boolean; createdAt: string; updatedAt: string; createdBy: string; updatedBy: string; groups: CommissionGroup[] }
const clone = (groups: CommissionGroup[]): CommissionGroup[] => groups.map(group => ({ ...group, payouts: group.payouts.map(payout => ({ ...payout })) }))
export const scopeOptions = ['全部体验课', '全部正价课', '平台综合服务费', '合伙人加盟费']
export const participantOptions = ['注册邀请', '销售转化', '招聘老师']
export const attributionOptions = ['邀请注册绑定人', '最后销售转化人']
export const settlementOptions = ['交易完成后 7 天', '课消后 7 天', '人工结算']
export const shareWindowNames = ['1 小时', '6 小时', '12 小时', '24 小时', '48 小时', '72 小时', '7 天', '15 天', '永久有效']
export const defaultShareWindow = '24 小时'
export type ParamGroupKey = string
export type ParamItem = { id: number; name: string; sort: number; enabled: boolean; updatedAt: string; updatedBy: string }
export type ParamGroup = { key: ParamGroupKey; label: string; hint: string; builtin: boolean; enabled: boolean; items: ParamItem[] }
export const createParamGroups = (): ParamGroup[] => {
  let id = 1
  const make = (names: string[]): ParamItem[] => names.map((name, index) => ({ id: id++, name, sort: index + 1, enabled: true, updatedAt: '2026-09-09 10:12:00', updatedBy: '张敏' }))
  return [
    { key: 'scope', label: '适用范围', hint: '新建规则时“适用范围”下拉框的可选值，停用后不再可选。', builtin: false, items: make(scopeOptions) },
    { key: 'participant', label: '参与人', hint: '分润配置中“参与人”下拉框的可选值，同一条规则内每个参与人只能配置一组。', builtin: false, items: make(participantOptions) },
    { key: 'attribution', label: '客户归因', hint: '新建规则时“客户归因”下拉框的可选值。', builtin: false, items: make(attributionOptions) },
    { key: 'settlement', label: '结算时点', hint: '新建规则时“结算时点”下拉框的可选值。', builtin: false, items: make(settlementOptions) },
    { key: 'shareWindow', label: '有效分享时间', hint: '规则列表上方“有效分享时间”的可选时长。', builtin: false, items: make(shareWindowNames) },
    { key: 'level', label: '返还层级', hint: '返还层级与结算逻辑绑定，仅可查看不可增删。', builtin: true, items: make(['返给一级', '返给二级', '返给关系顶级']) },
    { key: 'mode', label: '计算方式', hint: '计算方式与金额计算逻辑绑定，仅可查看不可增删。', builtin: true, items: make(['按比例', '按金额']) }
  ].map(group => ({ ...group, enabled: true }))
}
export async function fetchRules(): Promise<Rule[]> {
  await new Promise(resolve => setTimeout(resolve, 260))
  return [
    { id: 1, name: '课程标准分润', scope: '全部正价课', selectedCourses: [], attribution: '最后销售转化人', settlement: '课消后 7 天', enabled: true, createdAt: '2026-09-01 09:18:26', updatedAt: '2026-09-08 10:42:15', createdBy: '张敏', updatedBy: '张敏', groups: [
      { participant: '注册邀请', payouts: [{ level: 'levelOne', mode: 'rate', value: 5, partnerOnly: false }] },
      { participant: '销售转化', payouts: [{ level: 'levelTwo', mode: 'rate', value: 20, partnerOnly: false }] }
    ] },
    { id: 2, name: '合伙人招募分润', scope: '合伙人加盟费', selectedCourses: [], attribution: '邀请注册绑定人', settlement: '人工结算', enabled: true, createdAt: '2026-08-28 14:06:51', updatedAt: '2026-09-07 16:23:08', createdBy: '李想', updatedBy: '王芳', groups: [
      { participant: '注册邀请', payouts: [{ level: 'levelOne', mode: 'rate', value: 8, partnerOnly: false }, { level: 'top', mode: 'rate', value: 2, partnerOnly: true }] },
      { participant: '招聘老师', payouts: [{ level: 'levelTwo', mode: 'rate', value: 15, partnerOnly: false }] }
    ] },
    { id: 3, name: '老客复购保护', scope: '全部体验课', selectedCourses: [], attribution: '最后销售转化人', settlement: '交易完成后 7 天', enabled: false, createdAt: '2026-09-03 11:32:04', updatedAt: '2026-09-07 09:15:42', createdBy: '张敏', updatedBy: '赵磊', groups: [
      { participant: '销售转化', payouts: [{ level: 'levelOne', mode: 'amount', value: 20, partnerOnly: true }] }
    ] }
  ]
}
export const emptyGroup = (): CommissionGroup => ({ participant: '', payouts: [{ level: 'levelOne', mode: 'rate', value: null, partnerOnly: false }] })
export const copyRule = (rule: Rule): Rule => ({ ...rule, selectedCourses: [...rule.selectedCourses], groups: clone(rule.groups) })
