interface props {
  Value?: string
  className?: string
  height?: string | number
  width?: string | number
  textHelper?: string
  textError?: string
  handleChange: (value: string) => void
}

export default function BaseTextArea(Props: props) {
  const styles =
    ' resize rounded-md border-0 py-1.5 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 outline-none placeholder:text-neutral-400 focus:ring-primary-500 sm:text-sm sm:leading-6 pl-4'

  return (
    <>
      <textarea
        onChange={(e) => Props.handleChange(e.target.value)}
        className={`${Props.className} h-[${Props.height}px] ${styles} ${
          Props.textError ? 'ring-red-500' : ''
        }`}
      >
        {Props.Value}
      </textarea>
      {Props.textHelper && !Props.textError && (
        <p className="pl-3 pt-3">* {Props.textHelper}</p>
      )}
      {Props.textError && (
        <p className="pl-3 pt-3 text-red-500">* {Props.textError}</p>
      )}
    </>
  )
}
