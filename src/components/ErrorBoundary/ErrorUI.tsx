interface Props {
  msg: string
}

const ErrorUI = (props: Props) => {
  return (
    <div className="w-full p-4 text-red-500 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="text-lg mt-6 text-center w-full">
        <span>Something busted that we didn't anticipate.</span>
        <br />
        <br />
        <span className="bg-red-100 text-red-600 block w-full p-4 rounded-md">
          Error: {props.msg.toString()}
        </span>
      </p>
    </div>
  )
}

export default ErrorUI
