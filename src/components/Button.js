import { useContext } from "react"
import { CalContext } from "../context/CalContext"

const getStyleName = btn => {

    const className={
        '=':'equals',
        'x':'opt',
        '-':'opt',
        '+':'opt',
        '/':'opt',
    }
    return className[btn]
}

const Button = ({value}) => {

    const {calc,setCalc}=useContext(CalContext);

    //user click comma
    const commaClick=()=>{
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        });
    }

    //====reset fuction=========
    const resetClick=()=>{
        setCalc({sign:'',num: 0, res:0})
    }

    //====user click number================
    const handleClickButton=()=>{
        const numberString= value.toString()

        let numberValue;
        if(numberString==='0' && calc.num===0){
            numberValue='0'
        }else{
            numberValue=Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }

    //========user sign opertion=================
    const signClick=()=>{
        setCalc({
            sign: value,
            res:!calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }
    //===========EQUAL operation==================
    const equalsClcik=()=>{
        if(calc.res && calc.num){
            const math=(a,b,sign)=>{
                const results ={
                    '+':(a,b)=> a + b,
                    '-':(a,b)=> a - b,
                    'x':(a,b)=> a * b,
                    '/':(a,b)=> a / b,
                }
                return results[sign](a,b);
            }
            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign:'',
                num:0
            })
        }
    }
    //======PERSENTAGE FUNCTION====================
    const persentClick=()=>{
        setCalc({
            num:(calc.num/100),
            res:(calc.res/100),
            sign:''
        })
    }

    //========CHANGE SIGN================
    const invertClick=()=>{
        setCalc({
            num: calc.num ? calc.num *-1 : 0,
            res: calc.res ? calc.res *-1 : 0,
            sign:''
        })
    }

    const handleBtnClick =()=>{
        
        const result={
            '.':commaClick,
            'C': resetClick,
            '/':signClick,
            '+':signClick,
            'x':signClick,
            '-':signClick,
            '=': equalsClcik,
            '%': persentClick,
            '+-':invertClick,
        }
        if(result[value]){
            return result[value]()
        } else{
            return handleClickButton()
        }
    }

  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button