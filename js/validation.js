let registrForm = document.querySelector('#reg-form')
let name = document.querySelector('#input-name')
let surname = document.querySelector('#input-surname')
let birthday = document.querySelector('#input-birthday')
let radioBtn = document.querySelectorAll('#input-male')
let radioContainer = document.querySelector('#radio-container')
let country = document.querySelector('#select-country')
let email = document.querySelector('#input-email')
let password1 = document.querySelector('#input-password-1')
let password2 = document.querySelector('#input-password-2')
let address = document.querySelector('#input-address')
let notes = document.querySelector('#notes')

function validate (e) {
  let passwordValidateFlag = true
  clearErrors()
  if (!textInputValidate(name, 1, 20)) {
    e.preventDefault()
  }
  if (!textInputValidate(surname, 1, 20)) {
    e.preventDefault()
  }
  if (!textInputValidate(address, 1, 30)) {
    e.preventDefault()
  }
  if (!selectListValidate(country)) {
    e.preventDefault()
  }
  if (!radioValidate(radioBtn)) {
    e.preventDefault()
  }
  if (!textInputValidate(password1, 1, 20)) {
    e.preventDefault()
    passwordValidateFlag = false
  }
  if (!textInputValidate(password2, 1, 20)) {
    e.preventDefault()
    passwordValidateFlag = false
  }
  if (passwordValidateFlag) {
    if (!checkPasswords(password1, password2)) {
      e.preventDefault()
    }
  }
  if (!textInputValidate(email, 1, 40)) {
    e.preventDefault()
  } else if (!emailValidate(email)) {
    e.preventDefault()
  }
  if (!textareaValidate(notes)) {
    e.preventDefault()
  }
  if (!datapickerValidation(birthday)) {
    e.preventDefault()
  }
}

function datapickerValidation (elem) {
  let currentDate = new Date()
  let currentYear = +currentDate.getFullYear()
  let currentMonth = +currentDate.getMonth() + 1
  let currentDay = +currentDate.getDate()
  let [year, month, day] = elem.value.split('-')
  if (currentMonth < 10) {
    currentMonth = +`0${currentMonth}`
  }
  if (currentDay < 10) {
    currentDay = +`0${currentDay}`
  }
  if (+year >= 1900 && +year < currentYear) {
    unStylishBorder(elem)
    return true
  } else if (+year >= 1900 && +year === currentYear && +month < currentMonth) {
    unStylishBorder(elem)
    return true
  } else if (+year >= 1900 && +year === currentYear && +month === currentMonth && +day <= currentDay) {
    unStylishBorder(elem)
    return true
  } else {
    let errorList = generateError('Ошибка: неверная дата')
    insertAfter(errorList, elem)
    stylishBorder(elem)
    return false
  }
}
function textareaValidate (elem) {
  if (!checkBannedSymbols(elem.value)) {
    let errorList = generateError('Ошибка: * наличие недопустимых символов ", \' или «')
    insertAfter(errorList, elem)
    stylishBorder(elem)
    return false
  }
  unStylishBorder(elem)
  return true
}
function emailValidate (elem) {
  let regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (regEmail.test(elem.value)) {
    unStylishBorder(elem)
    return true
  }
  let errorList = generateError('Ошибка: не верно заданый e-mail')
  insertAfter(errorList, elem)
  stylishBorder(elem)
  return false
}
function checkPasswords (elem1, elem2) {
  if (elem1.value !== elem2.value) {
    let errorList1 = generateError('Ошибка: разные пароли')
    let errorList2 = generateError('Ошибка: разные пароли')
    insertAfter(errorList1, elem1)
    insertAfter(errorList2, elem2)
    stylishBorder(elem1)
    stylishBorder(elem2)
    return false
  }
  unStylishBorder(elem1)
  unStylishBorder(elem2)
  return true
}
function radioValidate (element) {
  let flag = false
  element.forEach(elem => {
    if (elem.checked) {
      unStylishBorder(radioContainer)
      flag = true
    }
  })
  if (!flag) {
    let errorList = generateError('Ошибка: вы не выбрали пол')
    insertAfter(errorList, radioContainer)
    stylishBorder(radioContainer)
  }
  return flag
}
function selectListValidate (element) {
  if (element.selectedIndex < 1) {
    let errorList = generateError('Ошибка: вы не выбрали страну')
    insertAfter(errorList, element)
    stylishBorder(element)
    return false
  }
  unStylishBorder(element)
  return true
}
function textInputValidate (element, min, max) {
  if (!checkLength(element.value, min, max)) {
    let errorList = generateError(`Ошибка: данное поле должно иметь длину от ${min} до ${max} символов`)
    insertAfter(errorList, element)
    stylishBorder(element)
    return false
  } else if (!checkBannedSymbols(element.value)) {
    let errorList = generateError('* наличие недопустимых символов ", \' или «')
    insertAfter(errorList, element)
    stylishBorder(element)
    return false
  }
  unStylishBorder(element)
  return true
}
function stylishBorder (elem) {
  elem.classList.add('error')
}
function unStylishBorder (elem) {
  elem.classList.remove('error')
}
function clearErrors () {
  let error = document.querySelectorAll('.registration-form__text-error')
  error.forEach(item => {
    item.remove()
  })
}
function checkBannedSymbols (str) {
  if (str.indexOf('\'') !== -1 || str.indexOf('"') !== -1 || str.indexOf('«') !== -1) {
    return false
  }
  return true
}

function generateError (text) {
  let errorList = document.createElement('div')
  errorList.className = 'registration-form__text-error'
  errorList.innerHTML = text
  return errorList
}

function insertAfter (elem, refElem) {
  let parent = refElem.parentNode
  let next = refElem.nextSibling
  if (next) {
    return parent.insertBefore(elem, next)
  } else {
    return parent.appendChild(elem)
  }
}

function checkLength (text, min, max) {
  if (text.length < min || text.length > max) {
    return false
  }
  return true
}

registrForm.addEventListener('submit', (e) => {
  validate(e)
})
