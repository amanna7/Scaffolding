/**
 * Forms
 */

/**
 * API
*/
export interface DeleteResponse {
  message: string
}
export interface BuyProduct { token: string, id: number }
export interface BuyProductResponse { url: string | null }
export interface IsProductPaid { token: string, id: number }
export interface IsProductPaidResponse { hasPaid: boolean }
/**
 * Redux
 */
export interface State {
  userInfo: UserStore
}
export interface Authenticated {
  token: string
}
type Status = 'success' | 'idle' | 'error' | 'loading'
interface UserStore {
  errorMessage: string
  postStatus: Status
}
/**
 * Utils
 */
export interface WithChildren {
  children?: React.ReactNode
}

type userColumns = {
  id: string,
  name: string,
  surname: string,
  address: string,
  birthdate: string,
  actions?: string,
  company?: never,
  start_date?: never,
  end_date?: never,
  job_title?: never,
}

type companyColumns = {
  id: string,
  name: string,
  address: string,
  country: string,
  ceo: string,
  employer_identfication_number: string,
  foundation_date: string,
  number_of_employees: string,
  sector: string,
  surname?: never,
  birthdate?: never,
  user_id?: never,
  company?: never,
  start_date?: never,
  end_date?: never,
  job_title?: never,
  actions?: never,
}
type employeeColumns = {
  id: string
  user_id: string,
  name: string,
  surname: string,
  company: string,
  start_date: string,
  end_date: string,
  job_title: string,
  actions?: string,
}

export type tableColumns = userColumns | companyColumns | employeeColumns

export type PermissionType = 'admin' | 'designer' | 'user'
