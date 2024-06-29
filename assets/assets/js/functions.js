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
        // console.error('Elemento "meuFormulario" não encontrado.');
    }

    const username = "EduDarif";

    function fetchRepos() {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
          const reposContainer = document.getElementById('repos-container');
          data.forEach((repo) => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');
            repoCard.innerHTML = `
              <div class="repo-info">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description'}</p>
              </div>
              <div class="repo-links">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
              </div>
            `;
            reposContainer.appendChild(repoCard);
          });
        })
        .catch((error) => console.error("Erro:", error));
    }
    
    function displayPersonalInfo() {
      const personalInfoContainer = document.getElementById('personal-info');
      personalInfoContainer.innerHTML = `
        <h2>Muito prazer, me chamo Eduardo Darif da Rocha</h2>
        <p>Tenho 20 anos e nasci em Curitiba, Paraná, no ano de 2003. Possuo o ensino médio completo e ingressei na faculdade em 2022 no curso de engenharia da computação. Após um ano de estudos, percebi que esse curso não era para mim. No ano seguinte, mudei para engenharia de software e estou atualmente no 3º período.</p>
        <p>No início dos meus estudos em tecnologia, não tinha muito interesse, apesar de ser apaixonado por jogos e robótica desde a infância. Costumava procrastinar bastante e apenas curtia jogar. Porém, minha perspectiva mudou completamente. Agora, não quero apenas aproveitar o modo história de um jogo ou navegar em um site bonito. Quero criar, desenvolver e resolver problemas na área da tecnologia.</p>
      `;
    }
    
    fetchRepos();
    displayPersonalInfo();    

});
