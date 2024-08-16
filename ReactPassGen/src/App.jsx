import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumALLow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [Password, setPassword] = useState("")

  const passwordref=useRef(null)

  const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz"
        if(numAllow) str+="012345678"
        if(charAllow) str+="!@#$%^&*.,<>"

        for (let i = 1; i <=length; i++) {
          let char= Math.floor(Math.random()*str.length +1)
          pass+=str.charAt(char)
        }
        setPassword(pass)
  }, [length, numAllow, charAllow, setPassword])

  const copyOnClip=useCallback(()=>{
        passwordref.current?.select()
        window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllow, charAllow,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md  rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className='text-white text-center my-3'>Password Generator
      </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text' value={Password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordref}
          />
          <button
            onClick={copyOnClip}
          className='bg-blue-400 text-white px-3 py-0.5'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={20} value={length} className='cursor-pointer'
              onChange={(e)=>{
                setLength(e.target.value)
              }}
            />
            <label >length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input  
                type='checkbox'
                defaultChecked={numAllow}
                id='numinput'
                onChange={()=>{
                  setNumALLow((prev)=> !prev)
                }}
              />
              <label htmlFor="numinput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input  
                type='checkbox'
                defaultChecked={charAllow}
                id='charinput'
                onChange={()=>{
                  setCharAllow((prev)=> !prev)
                }}
              />
              <label htmlFor="charinput">Char</label>
          </div>
        </div>
        </div>
    </>
  )
}

export default App
