import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { decryptCaesarCipher, encryptCaesarCipher } from '../utils/ceaser';
import { decryptBeaufortCipher, encryptBeaufortCipher } from '../utils/beaufort';
import { decryptAutokeyCipher, encryptAutokeyCipher } from '../utils/autokey';
import { decryptAtbashCipher, encryptAtbashCipher } from '../utils/atbash';

const Form: React.FC = () => {

    const [alignment, setAlignment] = useState('encrypt');
    const [showPassword, setShowPassword] = useState(false);

    const [inputText, setInputText] = useState<string>('')
    const [key, setKey] = useState<string>('')
    const [cypher, setCypher] = useState<string>('')
    const [outputText, setOutputText] = useState<string>('')

    useEffect(() => {
        setInputText('')
        setKey('')
        setOutputText('')
    }, [cypher])

    const handleEncrypt = () => {
        if (cypher == 'ceaser') {
            encryptCaesarCipher(inputText, key, setOutputText)
        }
        else if (cypher == 'beaufort') {
            encryptBeaufortCipher(inputText, key, setOutputText);
        }
        else if (cypher == 'autokey') {
            encryptAutokeyCipher(inputText, key, setOutputText);
        }
        else if (cypher == 'atbash') {
            encryptAtbashCipher(inputText, setOutputText);
        }
    }
    const handleDecrypt = () => {
        if (cypher == 'ceaser') {
            decryptCaesarCipher(inputText, key, setOutputText)
        }
        else if (cypher == 'beaufort') {
            decryptBeaufortCipher(inputText, key, setOutputText);
        }
        else if (cypher == 'autokey') {
            decryptAutokeyCipher(inputText, key, setOutputText);
        }
        else if (cypher == 'atbash') {
            decryptAtbashCipher(inputText, setOutputText);
        }
    }

    const handleSubmit = () => {
        alignment == 'encrypt'
            ?
            handleEncrypt()
            :
            handleDecrypt()
    }


    return (
        <div className='flex flex-col w-full h-[25rem] gap-6 ' >

            <div className="flex justify-center items-center w-full">
                <div className="rounded-md w-44 grid grid-cols-2 overflow-hidden ">
                    <button onClick={() => setAlignment('encrypt')} className={`${alignment == 'encrypt' ? 'bg-dark-muted-foreground bg-opacity-90 text-dark-primary-foreground' : 'bg-dark-muted text-dark-secondary-foreground'} hover:bg-dark-muted-foreground hover:text-dark-primary-foreground hover:bg-opacity-90 px-4 py-3 w-full `} >Encrypt</button>
                    <button onClick={() => setAlignment('decrypt')} className={`${alignment == 'decrypt' ? 'bg-dark-muted-foreground bg-opacity-90 text-dark-primary-foreground' : 'bg-dark-muted text-dark-secondary-foreground'} hover:bg-dark-muted-foreground hover:text-dark-primary-foreground hover:bg-opacity-90 px-4 py-3 w-full `} >Decrypt</button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 h-full ">
                <div className="col-span-1 flex flex-col gap-2 ">
                    <label htmlFor="output" className='text-xl font-medium text-dark-secondary-foreground ' >Input Text</label>
                    <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='Place your text here' name="input" className='px-4 w-full h-full border border-dark-border rounded-md resize-none bg-dark-muted text-dark-muted-foreground ' />
                </div>
                <div className="col-span-1 flex flex-col justify-center gap-4 ">
                    <div className="flex flex-col gap-2">
                        <select value={cypher} onChange={(e) => setCypher(e.target.value)} name="type" id="type" className='focus:outline-none px-4 h-[40px] w-full rounded-md border border-dark-border bg-dark-muted text-dark-muted-foreground ' >
                            <option value="atbash">Atbash</option>
                            <option value="autokey">Autokey</option>
                            <option value="beaufort">Beaufort</option>
                            <option value="ceaser">Ceaser</option>
                            <option value="hill">Hill</option>
                            <option value="monoalphabetic">Monoalphabetic</option>
                            <option value="playfair">Playfair</option>
                            <option value="railfence">Railfence</option>
                            <option value="runningkey">Runningkey</option>
                            <option value="substitution">Substitution</option>
                            <option value="transposition">Transposition</option>
                            <option value="vegenere">Vegenere</option>
                        </select>
                        <div className="relative h-[40px] ">
                            <input value={key} onChange={(e) => setKey(e.target.value)} placeholder='Your Key' type={showPassword ? "text" : "password"} className="px-4 w-full h-[40px] rounded-md border border-dark-border bg-dark-muted text-dark-foreground " />
                            <div className="h-fit absolute top-[18%] right-3 cursor-pointer ">
                                {
                                    showPassword
                                        ?
                                        <FaEyeSlash onClick={() => setShowPassword(false)} className='text-[24px]' />
                                        :
                                        <FaEye onClick={() => setShowPassword(true)} className='text-[24px]' />
                                }
                            </div>

                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <button onClick={handleSubmit} className='bg-dark-primary hover:bg-opacity-90 rounded-md px-4 py-3 w-fit ' >{alignment == 'encrypt' ? 'Encryt' : 'Decrypt'}</button>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-2 ">
                    <label htmlFor="output" className='text-xl font-medium text-dark-secondary-foreground ' >Encrypted Text</label>
                    <textarea value={outputText} disabled placeholder='Encrypted Text' id='output' name="output" className='px-4 w-full h-full border border-dark-border rounded-md resize-none bg-dark-muted text-dark-muted-foreground ' />
                </div>
            </div>

        </div>
    )
}

export default Form