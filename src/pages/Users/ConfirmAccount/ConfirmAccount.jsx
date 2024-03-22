import { useEffect, useState } from "react"
import { Link, useParams} from "react-router-dom"
import Alert from "@components/Alert";
import axiosClient from "@config/axiosClient";

const ConfirmAccount = () => {

  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const params = useParams();
  const {id} = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        const { data } = await axiosClient(url)

        setAlert({
         message: data.message,
         error: false
        })
        setConfirmedAccount(true)

      } catch (error) {
        console.log(error)
        setAlert({
          message: error.response.data.error,
          error: true
        })
      }
    }
    confirmAccount();
  }, [])

  const { message } = alert;


  return (
    <>
      <h1 className="text-slate-300 font-black text-6xl capitalize px-4 md:px-0">
        Confirma tu cuenta y comienza a {''} chatear  
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-highlight">
        {message && <Alert alert={alert}/>}
        {confirmedAccount && 
          <Link className="block text-center my-5 text-white uppercase text-sm"
          to="/">Inicia Sesión</Link>
        }
      </div>
    </>
  )
}

export default ConfirmAccount