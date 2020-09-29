<template>
  <section class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card bg-light p-1 showdow-sm">
            <div class="card-title">
              <h1>Users</h1>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created</th>
                    <th scope="col">At</th>
                    <th scope="col">Action</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <div
                  v-if="usersLoading"
                  class="spinner-border"
                  style="width: 3rem; height: 3rem"
                  role="status"
                ></div>
                <tbody v-else>
                  <tr v-for="(user, index) in allUsers" :key="user._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.userName }}</td>

                    <td>{{ user.email }}</td>
                    <td>
                      {{ $moment(user.createdAt).format('DD/MM/YY') }}
                    </td>
                    <td>
                      {{ $moment(user.createdAt).format('HH:mm') }}
                    </td>
                    <td>
                      <button class="btn btn-info" @click="editUser(user._id)">
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-danger"
                        @click="deleteUser(user._id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'Users',
  data() {
    return {
      userDetails: {
        email: '',
        userName: '',
        password: '',
        repeat_password: '',
        status: false,
      },
      allUsers: [],
      usersLoading: false,
      isValid: false,
      addLoading: false,
      addState: false,
    }
  },

  computed: {
    isDisabled() {
      if (
        this.userDetails.email === '' ||
        this.userDetails.userName === '' ||
        this.userDetails.password === '' ||
        this.userDetails.repeat_password === ''
      ) {
        return !this.isValid
      }
      return this.isValid
    },
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers() {
      this.usersLoading = true
      try {
        const data = await this.$axios.$get('/api/auth/users')
        this.allUsers = data.users
        this.usersLoading = false
      } catch (error) {
        this.usersLoading = false
        this.$swal('Error', error.response.data.error, 'error')
      }
    },
    initForm() {
      this.addState = !this.addState
    },

    deleteUser(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$axios
            .$delete(`/api/auth/delete/${id}`)
            .then((response) => {
              this.getAllUsers()
              this.$swal({
                text: "Poof! You've sucessfully deleted that user!",
                icon: 'success',
              })
            })
            .catch((err) => {
              this.$swal(
                'Error',
                `Somethimg went wrong, Error: ${err}`,
                'error'
              )
            })
        } else {
          this.$swal("That User's data is safe!")
        }
      })
    },
  },
}
</script>
