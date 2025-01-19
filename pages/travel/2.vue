<script lang="ts">
import {usePersonState} from "~/stores/person";

export default defineComponent({
    name: "Index",
    setup() {
        const person = usePersonState();
        return {
            person
        }
    },
    data: () => ({
        personPhysicsDmg: 0,
    }),
    methods: {
        getDmgValue(target: any, value: any) {
            const targetChar = this.$refs[target];
            if (targetChar) {
                //@ts-ignore
                targetChar.receiveDamage(value);
            }
        }
    }
})
</script>

<template>
    <div class="detail">
        <div class="detail__container container">
            <div class="detail__person">
                <Person
                    ref="person"
                    :isVisibleCharacteristics="false"
                    @physicsAttack="getDmgValue('mob', $event)"
                />
            </div>
            <div class="detail__mobs">
                <div class="detail__mob">
                    <MobsMob
                        ref="mob"
                        @physicsAttack="getDmgValue('person', $event)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "assets/scss/pages/travel/id/styles";
</style>