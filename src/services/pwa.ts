
export function isStandAlone(): boolean {
    // return window.matchMedia('(display-mode: standalone)').matches;
    // @ts-ignore
    return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone);

  // if (window.matchMedia('(display-mode: standalone)').matches) {
  //   window.addEventListener('click', function () {
  //     if (
  //       event.target.tagName === 'A' &&
  //       !baseRegex.test(event.target.href)
  //     ) {
  //       document.getElementById('loading-indicator').classList.add('is-active');
  //     }
  //   });
  // }
}

export function isWebWorker(): boolean {
  return 'serviceWorker' in navigator;
}