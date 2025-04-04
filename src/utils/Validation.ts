interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  customValidator?: (value: string) => string | null
}

interface AuthParams {
  email: string
  password: string
}

interface RegisterParams extends AuthParams {
  name: string
  surname: string
  passwordAgain: string
}

interface FormErrors {
  email?: string
  password?: string
  passwordAgain?: string
  name?: string
  surname?: string
}

export const validateField = (
  fieldName: string,
  value: string,
  rules: ValidationRules,
): string | null => {
  if (rules.required && !value.trim()) {
    return `${fieldName} является обязательным полем`
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `${fieldName} должен содержать минимум ${rules.minLength} символов`
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `${fieldName} должен содержать максимум ${rules.maxLength} символов`
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return `${fieldName} имеет неверный формат`
  }

  if (rules.customValidator) {
    return rules.customValidator(value)
  }

  return null
}

// Валидация формы логина
export const validateLoginForm = ({
  email,
  password,
}: AuthParams): FormErrors => {
  const errors: FormErrors = {}

  const emailError = validateField("Email", email, {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  if (emailError) errors.email = emailError

  const passwordError = validateField("Пароль", password, {
    required: true,
    minLength: 9,
  })
  if (passwordError) errors.password = passwordError

  return errors
}

// Валидация формы регистрации
export const validateRegisterForm = ({
  email,
  password,
  passwordAgain,
  name,
  surname,
}: RegisterParams): FormErrors => {
  const errors = validateLoginForm({ email, password })

  const nameError = validateField("Имя", name, {
    required: true,
    minLength: 2,
    maxLength: 30,
  })
  if (nameError) errors.name = nameError

  const surnameError = validateField("Фамилия", surname, {
    required: true,
    minLength: 2,
    maxLength: 30,
  })
  if (surnameError) errors.surname = surnameError
  const passwordAgainError = validateField("Пароль", passwordAgain, {
    required: true,
    minLength: 9,
  })
  if (passwordAgainError) errors.passwordAgain = passwordAgainError

  if (passwordAgain !==password)  errors.passwordAgain = 'Пароли не совпадают'
  return errors
}
