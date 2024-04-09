import { atomWithStorage } from 'jotai/utils'
const _is_login = atomWithStorage('is_login', false)

export {
    _is_login
}