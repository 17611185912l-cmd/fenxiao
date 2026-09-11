export type CommissionMode = 'rate' | 'amount'
export type CommissionLevel = 'levelOne' | 'levelTwo' | 'top'
export type CommissionPayout = { level: CommissionLevel; mode: CommissionMode; value: number | null; partnerOnly: boolean }
export type CommissionGroup = { participant: string; payouts: CommissionPayout[] }
export type Rule = { id: number; name: string; scope: string; selectedCourses: string[]; attribution: string; settlement: string; enabled: boolean; createdAt: string; updatedAt: string; createdBy: string; updatedBy: string; groups: CommissionGroup[] }
const clone = (groups: CommissionGroup[]): CommissionGroup[] => groups.map(group => ({ ...group, payouts: group.payouts.map(payout => ({ ...payout })) }))
export const scopeOptions = ['全部课程', '全部正价课', '全部体验课', '指定课程', '平台综合服务费', '合伙人加盟费']
export const participantOptions = ['注册邀请', '销售转化', '招聘老师']
export const courseOptions = ['数学体验课', '数学正式课', '英语正式课', '物理提升课', '化学同步课']
export const attributionOptions = ['邀请注册绑定人', '最后销售转化人']
export const settlementOptions = ['交易完成后 7 天', '课消后 7 天', '人工结算']
export type ShareWindowOption = { label: string; value: string }
export const shareWindowOptions: ShareWindowOption[] = [
  { label: '1 小时', value: '1h' },
  { label: '6 小时', value: '6h' },
  { label: '12 小时', value: '12h' },
  { label: '24 小时', value: '24h' },
  { label: '48 小时', value: '48h' },
  { label: '72 小时', value: '72h' },
  { label: '7 天', value: '7d' },
  { label: '15 天', value: '15d' },
  { label: '永久有效', value: 'never' }
]
export const defaultShareWindow = '24h'
export async function fetchRules(): Promise<Rule[]> {
  await new Promise(resolve => setTimeout(resolve, 260))
  return [
    { id: 1, name: '课程标准分润', scope: '全部课程', selectedCourses: [], attribution: '最后销售转化人', settlement: '课消后 7 天', enabled: true, createdAt: '2026-09-01 09:18:26', updatedAt: '2026-09-08 10:42:15', createdBy: '张敏', updatedBy: '张敏', groups: [
      { participant: '注册邀请', payouts: [{ level: 'levelOne', mode: 'rate', value: 5, partnerOnly: false }] },
      { participant: '销售转化', payouts: [{ level: 'levelTwo', mode: 'rate', value: 20, partnerOnly: false }] }
    ] },
    { id: 2, name: '合伙人招募分润', scope: '合伙人加盟费', selectedCourses: [], attribution: '邀请注册绑定人', settlement: '人工结算', enabled: true, createdAt: '2026-08-28 14:06:51', updatedAt: '2026-09-07 16:23:08', createdBy: '李想', updatedBy: '王芳', groups: [
      { participant: '注册邀请', payouts: [{ level: 'levelOne', mode: 'rate', value: 8, partnerOnly: false }, { level: 'top', mode: 'rate', value: 2, partnerOnly: true }] },
      { participant: '招聘老师', payouts: [{ level: 'levelTwo', mode: 'rate', value: 15, partnerOnly: false }] }
    ] },
    { id: 3, name: '老客复购保护', scope: '指定课程', selectedCourses: ['数学正式课', '英语正式课'], attribution: '最后销售转化人', settlement: '交易完成后 7 天', enabled: false, createdAt: '2026-09-03 11:32:04', updatedAt: '2026-09-07 09:15:42', createdBy: '张敏', updatedBy: '赵磊', groups: [
      { participant: '销售转化', payouts: [{ level: 'levelOne', mode: 'amount', value: 20, partnerOnly: true }] }
    ] }
  ]
}
export const emptyGroup = (): CommissionGroup => ({ participant: '', payouts: [{ level: 'levelOne', mode: 'rate', value: null, partnerOnly: false }] })
export const copyRule = (rule: Rule): Rule => ({ ...rule, selectedCourses: [...rule.selectedCourses], groups: clone(rule.groups) })
