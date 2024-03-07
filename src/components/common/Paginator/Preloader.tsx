import loadingGif from '../../../assets/gif/loading.gif'

export const Preloader = () => {
  return (
    <div className="preloader">
      <img src={loadingGif} alt="LOADING (GIF NOT LOADING)" />
    </div>
  )
}
