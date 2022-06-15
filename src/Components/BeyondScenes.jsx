export const BeyondScenes = () => {
  return (
    <div className='BeyondScenes'>
      <img draggable={false} src='/Gwent-Intro-Deck/assets/logo.png' alt='' className='BeyondScenesLogo' />
      <div className='BeyondScenesLogoText'>Побеждает умнейший</div>
      <button className='BeyondScenesBtn'>
        <a href='https://www.playgwent.com/ru/join'>Присоединяйся!</a>
      </button>
      <div className='BeyondScenesPS'>
        <a href='https://www.playgwent.com/ru/card-reveals'>Ознакомительная колода карт была взята с официального сайта GWENT</a>
        <img draggable={false} src='/Gwent-Intro-Deck/assets/cardLogo.png' alt='' className='BeyondScenesLogo' />
      </div>
    </div>
  )
}
