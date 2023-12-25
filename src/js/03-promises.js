import Notiflix from 'notiflix';

const startBtnRef = document.querySelector('.form button');
startBtnRef.addEventListener('click', (e) => {
    e.preventDefault();
    const firstDelay = Number(document.querySelector('.form input[name="delay"]').value);
    const stepDelay = Number(document.querySelector('.form input[name="step"]').value);
  const amountPromises = Number(document.querySelector('.form input[name="amount"]').value);
  let mydelay = firstDelay;
  for (let i = 1; i <= amountPromises; i++) {
          createPromise(i, mydelay)
            .then(({ position, delay }) => {
              Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
              Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        mydelay += stepDelay;
      }
    }
);




function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
  return promise;
}


