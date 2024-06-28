document.addEventListener("DOMContentLoaded", function () {
    const linksMenu = document.querySelectorAll('nav.menu_desktop a');
    linksMenu.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const targetOffset = targetSection.offsetTop;

                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    const imagem = document.getElementById('zoom');
    if (imagem) {
        imagem.addEventListener('mouseover', () => {
            imagem.style.transition = 'transform 0.5s ease';
            imagem.style.transform = 'scale(1.1)';
        });

        imagem.addEventListener('mouseout', () => {
            imagem.style.transition = 'transform 0.5s ease';
            imagem.style.transform = 'scale(1)';
        });
    }

    const segundaImagem = document.getElementById('zoom2');
    if (segundaImagem) {
        segundaImagem.addEventListener('mouseover', () => {
            segundaImagem.style.transition = 'transform 0.5s ease';
            segundaImagem.style.transform = 'scale(1.1)';
        });

        segundaImagem.addEventListener('mouseout', () => {
            segundaImagem.style.transition = 'transform 0.5s ease';
            segundaImagem.style.transform = 'scale(1)';
        });
    }

    const meuFormulario = document.getElementById('meuFormulario');
    if (meuFormulario) {
        meuFormulario.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;

            localStorage.setItem('nome', nome);
            localStorage.setItem('email', email);
            localStorage.setItem('telefone', telefone);
            localStorage.setItem('mensagem', mensagem);

            let dados = JSON.parse(localStorage.getItem('dados')) || [];

            dados.push({nome, email, telefone, mensagem});

            localStorage.setItem('dados', JSON.stringify(dados));

            alert('Dados salvos com sucesso!');

            meuFormulario.reset();

            reloadDados();
        });
    } else {
        console.error('Elemento "meuFormulario" não encontrado.');
    }

    fetch('https://api.github.com/users/EduDarif/repos')
    .then(response => response.json())
    .then(data => {
        data.forEach(repo => {
            console.log(repo.name);
        });
    })
    .catch(error => console.error('Erro', error));

    function reloadDados(){
        const dados = JSON.parse(localStorage.getItem('dados')) || [];
        const lista = document.getElementById('listaDados');
        lista.innerHTML ='';

        dados.forEach(dado => {
            const item = document.createElement('li');
            item.textContent = `Nome: ${dado.nome}, Email: ${dado.email}, Telefone: ${dado.telefone}, Mensagem: ${dado.mensagem}`;
            lista.appendChild(item);
        });
    }

});
