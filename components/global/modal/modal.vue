<script lang="ts">
export default defineComponent({
    name: "Modal",
    props: {
        size: {
            type: String,
            required: false,
            default: ""
        }
    }
})
</script>

<template>
    <div class="modal fade">
        <div :class="`modal-dialog modal-dialog--${size}`">
            <button class="modal-dialog__button modal-dialog__button--close button" type="button"
                    data-bs-dismiss="modal" aria-label="Закрыть">
                <nuxt-icon class="modal-dialog__icon modal-dialog__icon--close" name="global/close" />
            </button>
            <slot/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "modal";
</style>