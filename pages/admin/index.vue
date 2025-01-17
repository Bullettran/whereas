<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Index"
})
</script>

<template>
    <div class="admin">
        <div class="admin__container container">
            <h1 class="admin__title">Административная часть</h1>
            <div class="admin__buttons">
                <button class="admin__button animated-button6"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#js-admin-equip"
                >Добавить снаряжение
                </button>
                <button class="admin__button animated-button6"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#js-admin-material"
                >Добавить материал
                </button>
                <button class="admin__button animated-button6"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#js-admin-mob"
                >Добавить моба
                </button>
            </div>
        </div>
    </div>
    <Modal id="js-admin-equip">
        <AdminFormsEquip/>
    </Modal>
    <Modal id="js-admin-material">
        <AdminFormsEquip/>
    </Modal>
    <Modal id="js-admin-mob">
        <AdminFormsMob/>
    </Modal>

</template>

<style scoped lang="scss">
@import "assets/scss/pages/admin/styles";
</style>