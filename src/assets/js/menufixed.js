window.onscroll = () => {
    const fakeH = document.querySelector('#menu-drawer');
  
    if (window.innerWidth > 375) {
      if (window.pageYOffset >= 87) {
        fakeH.style.position = 'fixed';
      } else {
        fakeH.style.position = 'absolute';
      }
    }
  };
  