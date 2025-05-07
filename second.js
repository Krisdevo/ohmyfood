function createAndStyleElement(tag, className, content=''){
    const element = document.createElement(tag);
    if(className) element.className = className;
    if(content) element.innerHTML = content;
    
    return element;
}

function setupCounter(element){
    let counter = 0;
    const setCounter = (count) => {
        counter = count;
        element.innerHTML = `<button>${counter}</button`;
    };
     element.addEventListener('click', () => setCounter(counter + 1));
     setCounter(0)
}

 
 function createPage(){
    //creation des elements
    const app = document.getElementById('app');
    const nav = createAndStyleElement('nav');
    const homeLink = createAndStyleElement('a','', 'Accueil');
    const secondLink = createAndStyleElement('a','', 'Infos' );
    const thirstLink = createAndStyleElement('a','','Produits');
    const networksButton = createAndStyleElement('a','','Réseaux');

    networksButton.addEventListener('click', (event) => {
        event.stopPropagation()
        subMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) =>{
        if (!nav.contains(event.target)){
            subMenu.classList.remove('active');
        }
    });

    // ajout des boutons a la navbar
    nav.appendChild(homeLink);
    nav.appendChild(secondLink);
    nav.appendChild(thirstLink);
    nav.appendChild(networksButton);
    app.appendChild(nav);

    const subMenu = createAndStyleElement('div', 'sub-menu', `
            <a href="https://twitter.com" target ="blank">Twitter</a>
            <a href="https://facebook.com" target ="blank">Facebook</a>
            <a href="https://linkedin.com" target ="blank">Linkedin</a>
        `);

        nav.appendChild(subMenu);

    // creation contenaire section 
    const mainContent = createAndStyleElement('div','main-content')

    //creation des sections 
    const homeSection = createAndStyleElement('div', 'section active',`
        <h2> Bienvenue sur Javascript DOM </h2>
        <p> Cliquez sur le compteur</p>
        <div id="counter" class="counter">Compteur</div>
        `)

    const homeInfos = createAndStyleElement('div', 'section',`
        <h2> VGFUG</h2>

        `)

    const homeContact = createAndStyleElement('div', 'section',`
    <h2>BHGIHPJPJ</h2>
    `)

    const homeProduit = createAndStyleElement('div', 'section',`
    <h2>jijhààçuàçuà </h2>
    `)

    // creation des sections 
    mainContent.appendChild(homeSection);
    mainContent.appendChild(homeInfos);
    mainContent.appendChild(homeContact);
    mainContent.appendChild(homeProduit);

    //creation footer
    const footer = createAndStyleElement('footer', 'footer',`
        <p>&copy; 2024 Javascript DOM, Tout droits réservés.</p>
        <p>
            <a href="https://twitter.com" target ="blank">Twitter</a>
            <a href="https://facebook.com" target ="blank">Facebook</a>
            <a href="https://instagram.com" target ="blank">Instagram</a>
        </p>        
        `)


    //ajout de la navbar, contenare et footer
    

     app.appendChild(mainContent);
     app.appendChild(footer);



     //ecouter le clic du bouton home
    homeLink.addEventListener('click', () => {
        //j'affiche ma section home dans le conatiner
        showSection(homeSection);
        fetchData();
        closeSubmenu();
    })

    secondLink.addEventListener('click', () => {
        showSection(homeInfos);
        closeSubmenu();
    })

    thirstLink.addEventListener('click', () => {
        showSection(homeContact);
        closeSubmenu();
    })



    const counterElement = document.getElementById('counter');
    setupCounter(counterElement);


    //afficher une section
     function showSection(section){
        //selectionner toutes les sections| pour chaque section enleve la classe active
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove ('active'));
        //pour chaque section enlève la classe active
        section.classList.add('active');
     }

     function closeSubmenu(){
        const subMenu = document.querySelector('.sub-menu');
        if (subMenu.classList.contains('active')){
            subMenu.classList.remove('active');
        }
     }

    async function fetchData(){
        const dataContainer = document.querySelector('.homeSection');
        homeSection.innerHTML = '';

        const loadingElement = createAndStyleElement('div', 'loading', 'Loading...');
        homeSection.appendChild(loadingElement);

        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();

            setTimeout(() =>{
                homeSection.removeChild(loadingElement);

                data.slice(0 , 5).forEach(item =>{
                    const dataTitle = createAndStyleElement('h2', '',item.title);
                    const dataBody = createAndStyleElement('p', '', item.body)

                    homeSection.appendChild(dataTitle);
                    homeSection.appendChild(dataBody);

                });
            }, 1000);



        }

        catch (error){
            homeSection.removeChild(loadingElement);
            homeSection.textContent = 'Une erreur est survenue';
        }

    }

 }
 
 createPage()







