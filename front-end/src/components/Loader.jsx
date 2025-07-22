import { useSelector } from "react-redux"
import { MoonLoader } from "react-spinners"

const Loader = () => {
  const loading = useSelector((state) => state.loader.loading)

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <MoonLoader color="#10b981" size={60} />
    </div>
  )
}

export default Loader
