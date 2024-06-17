<template>
  <div class="containers mt-5 pt-5">
    <h2>마이 페이지</h2>
    <div v-if="user">
      <div class="form-group">
        <label for="username">아이디</label>
        <input type="text" class="form-control" id="username" v-model="user.username" readonly>
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" class="form-control" id="email" v-model="user.email" readonly>
      </div>
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" class="form-control" id="name" v-model="user.name" readonly>
      </div>
      <button class="btn btn-primary" @click="isEditUserModalVisible = true">회원정보 수정</button>
      <button class="btn btn-danger ml-2" @click="deleteAccount">회원탈퇴</button>
    </div>

    <!-- 회원정보 수정 모달 -->
    <div v-if="isEditUserModalVisible" class="modal-overlay" @click.self="isEditUserModalVisible = false">
      <div class="modal-contents">
        <h5>회원정보 수정</h5>
        <div class="form-group">
          <label for="editEmail">이메일</label>
          <input type="email" class="form-control" id="editEmail" v-model="editUser.email">
        </div>
        <div class="form-group">
          <label for="editName">이름</label>
          <input type="text" class="form-control" id="editName" v-model="editUser.name">
        </div>
        <div class="form-group">
          <label for="editPassword">새로운 비밀번호</label>
          <input type="password" class="form-control" id="editPassword" v-model="editUser.password">
        </div>
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
        </div>
        <button class="btn btn-primary" @click="updateUserInfo">저장하기</button>
        <button class="btn btn-secondary" @click="isEditUserModalVisible = false">닫기</button>
      </div>
    </div>

    <!-- 회원탈퇴 모달 -->
    <div v-if="isDeleteUserModalVisible" class="modal-overlay" @click.self="isDeleteUserModalVisible = false">
      <div class="modal-contents">
        <p>회원 탈퇴가 완료되었습니다.</p>
        <button class="btn btn-primary" @click="isDeleteUserModalVisible = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isEditUserModalVisible = ref(false);
    const isDeleteUserModalVisible = ref(false);

    return {
      isEditUserModalVisible,
      isDeleteUserModalVisible
    };
  },
  data() {
    return {
      user: null,
      editUser: {
        email: '',
        name: '',
        password: ''
      },
      confirmPassword: '',
      updateError: null
    };
  },
  async created() {
    const username = localStorage.getItem('username');
    if (username) {
      try {
        const response = await fetch(`http://localhost:3000/user/${username}`);
        const data = await response.json();
        if (data.success) {
          this.user = data.user;
          this.editUser.email = data.user.email;
          this.editUser.name = data.user.name;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  },
  methods: {
    async updateUserInfo() {
      if (this.editUser.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:3000/user/${username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editUser)
        });
        const data = await response.json();
        if (data.success) {
          this.user.email = this.editUser.email;
          this.user.name = this.editUser.name;
          this.isEditUserModalVisible = false;
          alert('회원정보가 수정되었습니다.');
        } else {
          this.updateError = '회원정보 수정에 실패했습니다.';
        }
      } catch (error) {
        console.error('Error updating user data:', error);
        this.updateError = '회원정보 수정 중 오류가 발생했습니다.';
      }
    },
    async deleteAccount() {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:3000/user/${username}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('username');
          this.isDeleteUserModalVisible = true;
          setTimeout(() => {
            this.isDeleteUserModalVisible = false;
            this.$router.push({ name: 'HomePage' });
          }, 2000);
        } else {
          console.error('회원 탈퇴에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error deleting user account:', error);
      }
    }
  }
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.containers {
    padding-top: 56px;
    width: 20%;
    margin: auto;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 배경 흐리게 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-contents {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: white; /* 모달창 배경색 하얀색 */
  background-clip: padding-box;
  border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
  border-radius: var(--bs-modal-border-radius);
  outline: 0;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* 모달창 자체는 흐리지 않음 */
  border: 1px solid #ccc; /* 박스형태의 테두리 */
}
</style>
