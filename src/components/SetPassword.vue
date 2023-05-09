<template>
  <form @submit.prevent="submit">
    <h2>Passwort Ändern</h2>
    <p class="text-sm text-gray mt-2 mb-4">
      Vorgaben: mind. 12 Zeihen, 1 Zahl, 1 Sonderzeichen, 1 Großbuchstabe, 1
      Kleinbuchstabe
    </p>
    <fieldset>
      <div class="flex flex-col md:flex-row gap-1 mb-6">
        <div class="flex-1">
          <DynInput
            ref="current_password"
            v-model="inputs.currentPassword"
            name="current_password"
            type="password"
            label="Aktuelles Passwort"
            :invalid="errors.currentPassword ? true : false"
            @keyup="validate('currentPassword')"
          >
            <template #append>
              <DynInputPasswordToggle :target-ref="current_password" />
            </template>
          </DynInput>
          <p
            v-if="errors.currentPassword"
            class="text-red-alert text-sm top-full w-full px-2 flex-1"
          >
            {{ errors.currentPassword }}
          </p>
        </div>
        <a
          href="#"
          class="flex-1 font-bebas uppercase tracking-wider md:mt-5 md:pt-px pl-1 text-blue-active hover:text-blue-highlight transition"
          >Passwort Vergessen
        </a>
      </div>
    </fieldset>
    <fieldset class="flex flex-col md:flex-row gap-3 md:gap-2 mb-7">
      <div class="flex-1 relative">
        <DynInput
          ref="new_password"
          v-model="inputs.newPassword"
          name="new_password"
          type="password"
          label="NeuesPasswort"
          :invalid="errors.newPassword ? true : false"
          @keyup="validate('newPassword')"
        >
          <template #append>
            <DynInputPasswordToggle :target-ref="new_password" />
          </template>
        </DynInput>
        <p
          v-if="errors.newPassword"
          class="text-red-alert text-sm top-full w-full px-2"
        >
          {{ errors.newPassword }}
        </p>
      </div>
      <div class="flex-1 relative">
        <DynInput
          ref="confirm_password"
          v-model="inputs.confirmPassword"
          name="confirm_password"
          type="password"
          label="Neues Passwort viederholen"
          :invalid="errors.confirmPassword ? true : false"
          @keyup="validate('confirmPassword')"
        >
          <template #append>
            <DynInputPasswordToggle :target-ref="confirm_password" />
          </template>
        </DynInput>
        <p
          v-if="errors.confirmPassword"
          class="text-red-alert text-sm top-full w-full px-2"
        >
          {{ errors.confirmPassword }}
        </p>
      </div>
    </fieldset>
    <div class="flex gap-2">
      <button
        @click="$emit('abort')"
        type="button"
        class="bt bt-secondary rounded px-4"
      >
        Abbrechen
      </button>
      <button class="bt bt-primary rounded px-4">Änderungen Speichern</button>
    </div>
  </form>
</template>

<script setup>
import DynInput from "./DynInput.vue";
import DynInputPasswordToggle from "./DynInputPasswordToggle.vue";
import { reactive, ref } from "vue";
import { useFirestore } from "vuefire";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { object as yupObject, string as yupString } from "yup";

const emits = defineEmits(["next", "abort"]);
const db = useFirestore();

/* id of 'user-one' would ideally be stored in a store management system like Pinia */
const userRef = doc(db, "users", "user-one");

const current_password = ref();
const new_password = ref();
const confirm_password = ref();

const inputs = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const errors = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const validationSchema = yupObject().shape({
  currentPassword: yupString().required("Dieses field ist nötig"),
  newPassword: yupString()
    .required("Dieses field ist nötig")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/, {
      message:
        "Passwort muss mind. 1 Zahl, 1 Sonderzeichen, 1 Großbuchstabe, 1 Kleinbuchstabe haben",
      excludeEmptyString: true,
    })
    .min(12, "Passwort muss mind. 12 Zeihen lange sein."),
  confirmPassword: yupString()
    .required("Dieses field ist nötig")
    .test(
      "password-match",
      "Die Passwörter stimmen nicht",
      (value) => value === inputs["newPassword"]
    ),
});

const validate = async function (field) {
  const value = await validationSchema.fields[field]
    .validate(inputs[field], { abortEarly: false })
    .catch((err) => {
      errors[field] = err.errors[0];
    });
  if (value) {
    errors[field] = "";
  }
};

const submit = async function () {
  for (let input in inputs) {
    await validate(input);
  }
  const value = await validationSchema.isValid(inputs);
  if (!value) {
    return;
  }

  const docSnap = await getDoc(userRef);
  if (docSnap.data().password !== inputs.currentPassword) {
    errors.currentPassword = "Das Passwort ist nicht genau";
    return;
  }

  const updatedPassword = await updateDoc(userRef, {
    password: inputs.newPassword,
  });

  emits("next");
};
</script>

<style scoped></style>
