export const state = () => ({
  toasts: [],
})

export const mutations = {
  SET_TOAST(state, toast) {
    state.toasts = state.toasts.concat(toast)
  },
}

export const actions = {
  setToast({ commit }, toast, append = false) {
    this._vm.$bvToast.toast(`${toast.text}`, {
      title: toast.title,
      autoHideDelay: toast.delay,
      appendToast: append,
      variant: toast.variant,
      solid: true,
    })
    commit('SET_TOAST', toast)
  },
}
