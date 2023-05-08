<template>
  <form @submit.prevent="submit">
    <h2 class="uppercase text-bold">Passwort Ändern</h2>
    <fieldset>
      <span>Vorgaben: mind. 12 Zeihen, 1 Zahl, 1 Sonderzeichen, 1 Großbuchstabe, 1 Kleinbuchstabe</span>
      <div class="flex gap-2 items-center mb-5">
        <div class="flex-1 relative">
          <DynInput
            name="current_password"
            type="password"
            ref="current_password"
            v-model="inputs.currentPassword"
            label="Aktuelles Passwort"
            :invalid="errors.currentPassword ? true : false"
            @keyup="validate('currentPassword')"
          >
            <template #append>
              <DynInputPasswordToggle :targetRef="current_password" />
            </template>
          </DynInput>
          <p v-if="errors.currentPassword" class="absolute text-red-alert text-sm top-full left-2">{{ errors.currentPassword }}</p>
        </div>
        <a href="" class="flex-1 uppercase mt-2">Passwort Vergessen</a>
      </div>
    </fieldset>
    <fieldset class="flex gap-2">
      <div class="flex-1 relative">
        <DynInput
          name="new_password"
          type="password"
          ref="new_password"
          v-model="inputs.newPassword"
          label="NeuesPasswort"
          :invalid="errors.newPassword ? true : false"
          @keyup="validate('newPassword')"
        >
          <template #append>
            <DynInputPasswordToggle :targetRef="new_password" />
          </template>
        </DynInput>
        <p v-if="errors.newPassword" class="absolute text-red-alert text-sm top-full left-2">{{ errors.newPassword }}</p>
      </div>
      <div class="flex-1 relative">
        <DynInput
          name="confirm_password"
          type="password"
          ref="confirm_password"
          v-model="inputs.confirmPassword"
          label="Neues Passwort viederholen"
          :invalid="errors.confirmPassword ? true : false"
          @keyup="validate('confirmPassword')"
        >
          <template #append>
            <DynInputPasswordToggle :targetRef="confirm_password" />
          </template>
        </DynInput>
        <p v-if="errors.confirmPassword" class="absolute text-red-alert text-sm top-full left-2">{{ errors.confirmPassword }}</p>
      </div>
    </fieldset>
    <div class="flex gap-2">
      <button type="button" class="bt bt-secondary">Abbrechen</button>
      <button class="bt bt-primary">Änderungen Speichern</button>
    </div>
  </form>
</template>

<script setup>
import DynInput from './DynInput.vue';
import DynInputPasswordToggle from './DynInputPasswordToggle.vue';
import { reactive, ref, unref } from 'vue';
import * as yup from 'yup'

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

const current_password = ref()
const new_password = ref()
const confirm_password = ref()

const inputs = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Dieses field is nötig'),
  newPassword: yup.string().required('Dieses field is nötig').matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/, {
    message: 'Passwort muss mind. 1 Zahl, 1 Sonderzeichen, 1 Großbuchstabe, 1 Kleinbuchstabe haben',
    excludeEmptyString: true
  }).min(12, 'Passwort muss mind. 12 Zeihen lange sein.'),
  confirmPassword: yup.string().required('Dieses field is nötig').test(
    'password-match', 
    'Die Passwörter stimmen nicht',
    (value, context) => value === inputs['newPassword']
  ) 
})

const axiosHelper = async function (data, options = {}) {
  
  try {
    const response = await axios (data, options)
    resetForm()
    return response
  } catch (error) {
    states.loading = false
    console.log (error)
  } finally {
    states.loading = false
  }
}

const validate = async function (field) {
  console.log(inputs['newPassword'])
  const value = await validationSchema.fields[field]
    .validate(inputs[field], { abortEarly: false })
    .catch(err => {
      errors[field] = err.errors[0]
    })
  if(value) {
    errors[field] = ''
  }
}

const submit = async function () {
  const value = await validationSchema.isValid(inputs)
  if(!value) {
    return
  }

  const formData = new FormData()
  for(const key in inputs) {
    formData.set(key, inputs[key])
  }

  const axios = await axiosHelper ()
}

</script>

<style scoped>

</style>