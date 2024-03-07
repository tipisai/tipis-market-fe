export interface CreateTeamFields {
  name: string
  identifier: string
  invitationCode?: string
}

export type CreateTeamErrorMsg = Partial<Record<keyof CreateTeamFields, string>>
