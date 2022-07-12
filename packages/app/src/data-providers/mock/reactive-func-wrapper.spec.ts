import { ref } from 'vue-demi'
import { reactiveFuncWrapper } from './reactive-func-wrapper'

describe('reactiveFuncWrapper', () => {
  test('one ref args', () => {
    const base = ref(1.5)
    const floorReactive = reactiveFuncWrapper(Math.floor)
    const result = floorReactive(base)
    expect (result.result.value).toBe(1)
    expect (result.loading.value).toBe(false)
    expect (result.error.value).toBe(null)

    base.value = 2.8
    expect(result.result.value).toBe(2)

  })

  test('two ref args', () => {
    const base = ref(0)
      const exponent = ref(0)
      const pow = reactiveFuncWrapper(Math.pow)
      const result = pow(base, exponent)

      expect(base.value).toBe(0)
      expect(result.result.value).toBe(1)

      base.value = 2
      exponent.value = 2

      expect(result.result.value).toBe(4)

      base.value = 3

      expect(result.result.value).toBe(9)

      exponent.value = 3

      expect(result.result.value).toBe(27)
  })

  test('mixed with literal', () => {
    const base = ref(0)
      const pow = reactiveFuncWrapper(Math.pow)
      const result = pow(base, 2)

      expect(base.value).toBe(0)
      expect(result.result.value).toBe(0)

      base.value = 10
      expect(result.result.value).toBe(100)
  })

  test('JSON.stringify', () => {

    const base = ref<any>(0)
    const stringify = reactiveFuncWrapper(JSON.stringify)
    const result = stringify(base, null, 2)

    expect(base.value).toBe(0)
    expect(result.result.value).toBe('0')

    base.value = { foo: 'bar' }
    expect(result.result.value).toBe('{\n  "foo": "bar"\n}')

  })
  it('Pythagorean theorem', () => {

    const pow = reactiveFuncWrapper(Math.pow)
    const sqrt = reactiveFuncWrapper(Math.sqrt)
    const add = reactiveFuncWrapper((a: number, b: number) => a + b)

    const a = ref(3)
    const b = ref(4)

    const c = sqrt(add(pow(a, 2).result, pow(b, 2).result).result)

    expect(c.result.value).toBe(5)

    a.value = 5
    b.value = 12

    expect(c.result.value).toBe(13)
  })
})

// describe('reactify', () => {
//



// })