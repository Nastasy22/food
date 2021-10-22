function forms() {
    // Forms <--start
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindPostData(item);
    });

    // Send data without FormData + XMLHttpRequest
    /*
        const message = {
            loading: 'Загрузка',
            success: 'Спасибо! Мы скоро с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = message.loading;
                form.append(statusMessage);
    
                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');
    
                const formData = new FormData(form);
    
                request.send(formData);
    
                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        statusMessage.textContent = message.success;
                        form.reset();
                        setTimeout( () => {
                            statusMessage.remove();
                        }, 2000);
    
                    } else {
                        statusMessage.textContent = message.failure;
                    }
                });
                
            })
        };
    */

    // Send data without JSON + XMLHttpRequest
    /*
        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Мы скоро с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);
            
                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                const formData = new FormData(form);
    
                const object = {};
                formData.forEach(function(value, key){
                    object[key] = value;
                });
                const json = JSON.stringify(object);
    
                request.send(json);
    
                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        showThanksModal(message.success);
                        statusMessage.remove();
                        form.reset();
                    } else {
                        showThanksModal(message.failure);
                    }
                });
            });
        }
    */

    // Send data without JSON + Fetch API
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data,
        });

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
    // Forms <--end
}

module.exports = forms;