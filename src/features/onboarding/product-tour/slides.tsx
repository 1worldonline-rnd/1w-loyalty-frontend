interface Slide {
    image: string;
    title: string;
    content: React.ReactNode[];
    isWelcome: boolean;
}

interface Slider {
    slides: Slide[];
    closeBtn: string;
    finishBtn: string;
    nextBtn: string;
    backBtn: string;
    startBtn: string;
}

export const getSlidesWithLocale = (locale: string, theme: string) => {
    if (locale === 'fr') {
        return slidesFr(theme);
    } else if (locale === 'de') {
        return slidesDe(theme);
    } else if (locale === 'es') {
        return slidesEs(theme);
    } else if (locale === 'pl') {
        return slidesPl(theme);
    } else if (locale === 'ru') {
        return slidesRu(theme);
    } else if (locale === 'uk') {
        return slidesUk(theme);
    } else if (locale === 'pt') {
        return slidesPt(theme);
    } else {
        return slidesEn(theme);
    }
};

const getImage = (fileName: string, theme: string) => {
    return theme === 'dark'
        ? `/loyalty/images/product-tour/dark/${fileName}`
        : `/loyalty/images/product-tour/light/${fileName}`;
};

const slidesEn = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Welcome to the Loyalty Program!',
                content: [
                    <>
                        Join us on a guided tour where you'll discover how to earn rewards, unlock exclusive
                        benefits, and enhance your experience with us. Earns you points that lead to exciting
                        perks such as discounts, early access to sales, and special members-only offers.
                    </>,
                    <br></br>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Main Navigation',
                content: [
                    <>
                        <strong>Dashboard</strong> is a page where you'll find a variety of available tasks
                        and activities that allow you to earn loyalty points. Complete these tasks to
                        accumulate points and unlock exciting rewards!
                    </>,
                    <>
                        On the <strong>Marketplace</strong>, you'll discover a tempting array of items and
                        rewards that you can redeem using your earned loyalty points. Treat yourself or save
                        up for something special!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Right menu',
                content: [
                    <>
                        <strong>Point Balance</strong> – Easily track your accumulated points with the "Point
                        Balance" feature. This shows your current balance in loyalty points, allowing you to
                        keep tabs on your rewards and plan for exciting redemptions.
                    </>,
                    <>
                        <strong>Loyalty Menu</strong> – Access all your loyalty program-related options and
                        information conveniently in the "Loyalty Menu." This menu provides access to your
                        Earning history, allowing you to review past activities, and also offers the ability
                        to manage your Account Settings for a personalized experience.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Article card and tasks',
                content: [
                    <>
                        The <strong>Article Card</strong> is an informative card that displays the available
                        events and their corresponding point values. When viewing a specific article page, you
                        can easily explore additional actions you can take to earn loyalty points. Find out
                        how you can earn points while exploring the specific article page.
                    </>,
                    <>
                        <strong>Required Events</strong> - Complete these essential tasks to mark the card as
                        completed and earn your base points. These are mandatory actions that contribute to
                        your progress within the loyalty program.
                    </>,
                    <>
                        <strong>Optional Events</strong> - Go the extra mile and earn additional points by
                        completing these optional tasks. While not mandatory, they present valuable
                        opportunities to boost your points and unlock even more exciting rewards.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Types of tasks',
                content: [
                    <>
                        <strong>Read Article</strong> - Earn loyalty points simply by reading the specified
                        article. The system will reward you for engaging with the content.
                    </>,
                    <>
                        <strong>Timer Icon</strong> - Earn points for reading an article by spending the
                        required time on the page. The system will reward you only after you reach the
                        specified timer threshold. It tracks your reading duration to determine your reward.
                    </>,
                    <>
                        <strong>Complete Questionnaire</strong> - Prepare to receive rewards by completing
                        various questionnaires, including quizzes, surveys, polls, and trivia. Each completed
                        questionnaire contributes to your points accumulation.
                    </>,
                    <>
                        <strong>Share</strong> - This task involves sharing a poll, quiz, survey, or trivia
                        widget on social media. Click the "Share" button on the widget, complete it, and earn
                        points. Each social network has a different point value for sharing.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Redemption. Available products',
                content: [
                    <>
                        <strong>Available List</strong> - Explore a curated "Available List" of products that
                        you can purchase using your loyalty points. If your balance is sufficient, you can
                        select from various rewarding options.
                    </>,
                    <>
                        <strong>Product Card</strong> - Each "Product Card" provides detailed information
                        about a specific product, showcasing its features, benefits, and images, making it
                        easier for you to make an informed decision.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Redemption. Redeemed products',
                content: [
                    <>
                        <strong>Redeemed</strong> - Your "Redeemed" list displays the products you've already
                        purchased using your earned points, along with instructions on how to receive them.
                        Enjoy your rewards!
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Task tracker',
                content: [
                    <>
                        Maximize your rewards quickly with our <strong>Task Tracker</strong>. Simply follow
                        our navigation widget for the next steps, complete activities, and rack up points.
                        Stay alert for new tasks to boost your balance and unlock exciting rewards. Ready to
                        earn more? Take the next step now!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Close',
        finishBtn: 'Finish',
        nextBtn: 'Next',
        backBtn: 'Back',
        startBtn: 'Start',
    };
};

const slidesDe = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Willkommen beim Treueprogramm!',
                content: [
                    <>
                        Begleiten Sie uns auf einer geführten Tour, bei der Sie erfahren, wie Sie Prämien
                        verdienen und exklusive freischalten können Vorteile und verbessern Sie Ihre Erfahrung
                        mit uns. Verdient Punkte, die zu spannenden Erlebnissen führen Vergünstigungen wie
                        Rabatte, früher Zugang zu Verkäufen und spezielle Angebote nur für Mitglieder.
                    </>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Hauptnavigation',
                content: [
                    <>
                        Die <strong>Dashboard</strong> ist eine Seite, auf der Sie eine Vielzahl von
                        verfügbaren Aufgaben und Aktivitäten finden, mit denen Sie Treuepunkte verdienen
                        können. Erledigen Sie diese Aufgaben, um Punkte zu sammeln und aufregende Belohnungen
                        freizuschalten!
                    </>,
                    <>
                        Auf der <strong>Marketplace</strong> finden Sie eine verlockende Auswahl an Artikeln
                        und Belohnungen, die Sie mit Ihren verdienten Treuepunkten einlösen können. Gönnen Sie
                        sich etwas oder sparen Sie für etwas Besonderes!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Rechtes Menü',
                content: [
                    <>
                        <strong>Punktestand</strong> - Verfolgen Sie Ihre gesammelten Punkte einfach mit der
                        Funktion "Punktestand". Hier wird Ihr aktueller Punktestand angezeigt, damit Sie Ihre
                        Belohnungen im Auge behalten und aufregende Einlösungen planen können.
                    </>,
                    <>
                        <strong>Treue-Menü</strong> - Greifen Sie bequem auf alle Optionen und Informationen
                        im Zusammenhang mit Ihrem Treueprogramm im "Treue-Menü" zu. Dieses Menü bietet Zugriff
                        auf Ihre Verdienstgeschichte, ermöglicht es Ihnen, vergangene Aktivitäten zu
                        überprüfen, und bietet auch die Möglichkeit, Ihre Kontoeinstellungen für ein
                        personalisiertes Erlebnis zu verwalten.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Artikelkarte und Aufgaben',
                content: [
                    <>
                        Die <strong>Artikelkarte</strong> ist eine informative Karte, auf der die verfügbaren
                        Ereignisse und ihre entsprechenden Punktwerte angezeigt werden. Wenn Sie eine
                        bestimmte Artikelseite anzeigen, können Sie leicht zusätzliche Aktionen erkunden, die
                        Sie ausführen können, um Treuepunkte zu verdienen. Erfahren Sie, wie Sie Punkte
                        sammeln können, während Sie die spezielle Artikelseite erkunden.
                    </>,
                    <>
                        <strong>Erforderliche Events</strong> - Erledigen Sie diese wesentlichen Aufgaben, um
                        die Karte als abgeschlossen zu markieren und Ihre Basispunkte zu verdienen. Dies sind
                        obligatorische Maßnahmen, die zu Ihrem Fortschritt im Treueprogramm beitragen.
                    </>,
                    <>
                        <strong>Optionale Events</strong> - Gehen Sie die Extra-Meile und verdienen Sie
                        zusätzliche Punkte, indem Sie diese optionalen Aufgaben erledigen. Obwohl nicht
                        obligatorisch, bieten sie wertvolle Möglichkeiten, um Ihre Punkte zu steigern und noch
                        aufregendere Belohnungen freizuschalten.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Arten von Aufgaben',
                content: [
                    <>
                        <strong>Artikel lesen</strong> - Verdienen Sie Treuepunkte, indem Sie einfach den
                        angegebenen Artikel lesen. Das System belohnt Sie dafür, sich mit dem Inhalt zu
                        beschäftigen.
                    </>,
                    <>
                        <strong>Timer-Symbol</strong> - Verdienen Sie Punkte für das Lesen eines Artikels,
                        indem Sie die erforderliche Zeit auf der Seite verbringen. Das System belohnt Sie
                        erst, nachdem Sie die festgelegte Zeitschwelle erreicht haben. Es verfolgt Ihre
                        Lesezeit, um Ihre Belohnung zu ermitteln.
                    </>,
                    <>
                        <strong>Teilen</strong> - Diese Aufgabe umfasst das Teilen einer Umfrage, eines Quiz,
                        einer Umfrage oder eines Trivia-Widgets in den sozialen Medien. Klicken Sie auf die
                        Schaltfläche "Teilen" auf dem Widget, vervollständigen Sie es und verdienen Sie
                        Punkte. Jedes soziale Netzwerk hat einen unterschiedlichen Punktwert für das Teilen.
                    </>,
                    <>
                        <strong>Fragebogen ausfüllen</strong> - Bereiten Sie sich darauf vor, Belohnungen zu
                        erhalten, indem Sie verschiedene Fragebögen ausfüllen, einschließlich Quiz, Umfragen,
                        Abstimmungen und Trivia. Jeder abgeschlossene Fragebogen trägt zu Ihrer Punktesammlung
                        bei.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Erlösung. Verfügbare Produkte',
                content: [
                    <>
                        <strong>Verfügbare Liste</strong> - Erkunden Sie eine sorgfältig ausgewählte
                        "Verfügbare Liste" von Produkten, die Sie mit Ihren Treuepunkten kaufen können. Wenn
                        Ihr Guthaben ausreichend ist, können Sie aus verschiedenen lohnenden Optionen
                        auswählen.
                    </>,
                    <>
                        <strong>Produktkarte</strong> - Jede "Produktkarte" bietet detaillierte Informationen
                        zu einem bestimmten Produkt, zeigt seine Eigenschaften, Vorteile und Bilder und
                        erleichtert Ihnen die informierte Entscheidung.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Erlösung. Eingelöste Produkte',
                content: [
                    <>
                        <strong>Eingelöste</strong> - Ihre Liste der "Eingelösten" zeigt die Produkte, die Sie
                        bereits mit Ihren verdienten Punkten gekauft haben, zusammen mit Anweisungen, wie Sie
                        diese erhalten können. Genießen Sie Ihre Belohnungen!
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Aufgabenverfolgung',
                content: [
                    <>
                        Maximieren Sie Ihre Belohnungen schnell mit unserem <strong>Task Tracker</strong>.
                        Folgen Sie einfach unserem Navigations-Widget für die nächsten Schritte, erledigen Sie
                        Aktivitäten und sammeln Sie Punkte. Bleiben Sie auf der Hut vor neuen Aufgaben, um Ihr
                        Guthaben zu verbessern und spannende Belohnungen freizuschalten. Bereit, mehr zu
                        verdienen? Machen Sie jetzt den nächsten Schritt!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Schließen',
        finishBtn: 'Beenden',
        nextBtn: 'Nächste',
        backBtn: 'Zurück',
        startBtn: 'Start',
    };
};

const slidesEs = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Bienvenido al Programa de Lealtad!',
                content: [
                    <>
                        Únase a nosotros en una visita guiada donde descubrirá cómo ganar recompensas y
                        desbloquear exclusivas. beneficios y mejorar su experiencia con nosotros. Gana puntos
                        que te llevan a emocionantes ventajas como descuentos, acceso anticipado a ofertas y
                        ofertas especiales solo para miembros.
                    </>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Navegación principal',
                content: [
                    <>
                        La página <strong>Dashboard</strong> es donde encontrarás una variedad de tareas y
                        actividades disponibles que te permiten ganar puntos de lealtad. ¡Completa estas
                        tareas para acumular puntos y desbloquear emocionantes recompensas!
                    </>,
                    <>
                        En la página de <strong>Marketplace</strong>, descubrirás una tentadora variedad de
                        artículos y recompensas que puedes canjear utilizando los puntos de lealtad que has
                        ganado. ¡Date un capricho o ahorra para algo especial!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Menú derecho',
                content: [
                    <>
                        <strong>Saldo de Puntos</strong> - Realiza un seguimiento fácil de tus puntos
                        acumulados con la función "Saldo de Puntos". Esto muestra tu saldo actual en puntos de
                        lealtad, lo que te permite estar al tanto de tus recompensas y planificar canjes
                        emocionantes.
                    </>,
                    <>
                        <strong>Menú de Lealtad</strong> - Accede a todas las opciones e información
                        relacionada con el programa de lealtad de manera conveniente en el "Menú de Lealtad".
                        Este menú te brinda acceso a tu historial de ganancias, lo que te permite revisar
                        actividades pasadas, y también ofrece la posibilidad de gestionar la configuración de
                        tu cuenta para una experiencia personalizada.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Tarjeta de artículos y tareas.',
                content: [
                    <>
                        La <strong>Tarjeta de Artículo</strong> es una tarjeta informativa que muestra los
                        eventos disponibles y sus valores en puntos correspondientes. Cuando visualizas una
                        página de artículo específica, puedes explorar fácilmente acciones adicionales que
                        puedes realizar para ganar puntos de lealtad. Descubre cómo puedes ganar puntos
                        mientras exploras la página de artículo específica.
                    </>,
                    <>
                        Los <strong>Eventos Obligatorios</strong> - Completa estas tareas esenciales para
                        marcar la tarjeta como completada y ganar tus puntos base. Estas son acciones
                        obligatorias que contribuyen a tu progreso dentro del programa de lealtad.
                    </>,
                    <>
                        Los <strong>Eventos Opcionales</strong> - Ve más allá y gana puntos adicionales
                        completando estas tareas opcionales. Aunque no son obligatorias, ofrecen oportunidades
                        valiosas para aumentar tus puntos y desbloquear aún más recompensas emocionantes.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Tipos de tareas',
                content: [
                    <>
                        <strong>Leer Artículo</strong> - Gana puntos de lealtad simplemente leyendo el
                        artículo especificado. El sistema te recompensará por interactuar con el contenido.
                    </>,
                    <>
                        <strong>Icono de Temporizador</strong> - Gana puntos por leer un artículo al pasar el
                        tiempo requerido en la página. El sistema te recompensará solo después de alcanzar el
                        umbral de tiempo especificado. Sigue la duración de tu lectura para determinar tu
                        recompensa.
                    </>,
                    <>
                        <strong>Compartir</strong> - Esta tarea implica compartir una encuesta, un
                        cuestionario, una encuesta o un widget de trivia en las redes sociales. Haz clic en el
                        botón "Compartir" en el widget, complétalo y gana puntos. Cada red social tiene un
                        valor de puntos diferente para compartir.
                    </>,
                    <>
                        <strong>Completar Cuestionario</strong> - Prepárate para recibir recompensas
                        completando varios cuestionarios, incluyendo cuestionarios, encuestas, encuestas y
                        trivia. Cada cuestionario completado contribuye a la acumulación de tus puntos.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Redención. Productos disponibles',
                content: [
                    <>
                        <strong>Lista de Disponibles</strong> - Explora una "Lista de Disponibles"
                        cuidadosamente seleccionada de productos que puedes comprar con tus puntos de lealtad.
                        Si tu saldo es suficiente, puedes elegir entre diversas opciones de recompensa.
                    </>,
                    <>
                        <strong>Tarjeta de Producto</strong> - Cada "Tarjeta de Producto" proporciona
                        información detallada sobre un producto específico, mostrando sus características,
                        beneficios e imágenes, lo que facilita tu decisión informada.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Redención. Productos canjeados',
                content: [
                    <>
                        <strong>Canjeados</strong> - Tu lista de "Canjeados" muestra los productos que ya has
                        comprado utilizando tus puntos ganados, junto con instrucciones sobre cómo recibirlos.
                        ¡Disfruta de tus recompensas!
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Rastreador de tareas',
                content: [
                    <>
                        Maximice sus recompensas rápidamente con nuestro <strong> Task Tracker </strong>.
                        Simplemente siga nuestro widget de navegación para conocer los siguientes pasos,
                        completar actividades y acumular puntos. Manténgase alerta a nuevas tareas para
                        aumentar su saldo y desbloquear recompensas interesantes. ¿Listo para ganar más? ¡Da
                        el siguiente paso ahora!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Cerca',
        finishBtn: 'Finalizar',
        nextBtn: 'Próximo',
        backBtn: 'Atrás',
        startBtn: 'Comenzar',
    };
};

const slidesFr = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Bienvenue au Programme de Fidélité !',
                content: [
                    <>
                        Rejoignez-nous pour une visite guidée où vous découvrirez comment accumuler des
                        récompenses, débloquer des avantages exclusifs et enrichir votre expérience chez nous.
                        Chaque achat vous rapporte des points qui vous donnent accès à des privilèges
                        excitants tels que des réductions, un accès anticipé aux ventes et des offres
                        spéciales réservées à nos membres.
                    </>,
                    <br></br>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Navigation principale',
                content: [
                    <>
                        La page <strong>Dashboard</strong> est l'endroit où vous trouverez une variété de
                        tâches disponibles et d'activités qui vous permettent de gagner des points de
                        fidélité. Accomplissez ces tâches pour accumuler des points et débloquer des
                        récompenses excitantes !
                    </>,
                    <>
                        Sur la page de <strong>Marketplace</strong>, vous découvrirez une tentante gamme
                        d'articles et de récompenses que vous pouvez échanger en utilisant vos points de
                        fidélité gagnés. Faites-vous plaisir ou économisez pour quelque chose de spécial !
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Menu de droite',
                content: [
                    <>
                        <strong>Solde de Points</strong> - Suivez facilement vos points accumulés avec la
                        fonctionnalité "Solde de Points". Cela affiche votre solde actuel en points de
                        fidélité, vous permettant de suivre vos récompenses et de planifier des échanges
                        excitants.
                    </>,
                    <>
                        <strong>Menu de Fidélité</strong> - Accédez à toutes les options et informations liées
                        au programme de fidélité de manière pratique dans le "Menu de Fidélité". Ce menu
                        permet d'accéder à votre historique des gains, vous permettant de revoir vos activités
                        passées, et offre également la possibilité de gérer vos paramètres de compte pour une
                        expérience personnalisée.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Fiche article et tâches',
                content: [
                    <>
                        La <strong>Carte d'Article</strong> est une carte informative qui affiche les
                        événements disponibles et leurs valeurs en points correspondantes. Lorsque vous
                        consultez une page d'article spécifique, vous pouvez facilement explorer les actions
                        supplémentaires que vous pouvez entreprendre pour gagner des points de fidélité.
                        Découvrez comment vous pouvez gagner des points tout en explorant la page d'article
                        spécifique.
                    </>,
                    <>
                        Les <strong>Événements Obligatoires</strong> - Accomplissez ces tâches essentielles
                        pour marquer la carte comme complète et gagner vos points de base. Ce sont des actions
                        obligatoires qui contribuent à votre progression au sein du programme de fidélité.
                    </>,
                    <>
                        Les <strong>Événements Optionnels</strong> - Allez plus loin et gagnez des points
                        supplémentaires en accomplissant ces tâches facultatives. Bien qu'elles ne soient pas
                        obligatoires, elles offrent des opportunités précieuses pour augmenter vos points et
                        débloquer encore plus de récompenses excitantes.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Types de tâches',
                content: [
                    <>
                        <strong>Lire l'Article</strong> - Gagnez des points de fidélité simplement en lisant
                        l'article spécifié. Le système vous récompensera pour votre engagement avec le
                        contenu.
                    </>,
                    <>
                        <strong>Icône de Minuterie</strong> - Gagnez des points pour la lecture d'un article
                        en respectant le temps requis sur la page. Le système vous récompensera uniquement
                        après avoir atteint le seuil de minuterie spécifié. Il suit la durée de votre lecture
                        pour déterminer votre récompense.
                    </>,
                    <>
                        <strong>Partager</strong> - Cette tâche consiste à partager un sondage, un quiz, une
                        enquête ou un widget de trivia sur les médias sociaux. Cliquez sur le bouton
                        "Partager" sur le widget, terminez-le et gagnez des points. Chaque réseau social a une
                        valeur de points différente pour le partage.
                    </>,
                    <>
                        <strong>Compléter un Questionnaire</strong> - Préparez-vous à recevoir des récompenses
                        en complétant divers questionnaires, y compris des quiz, des enquêtes, des sondages et
                        des trivia. Chaque questionnaire complété contribue à l'accumulation de vos points.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Rédemption. Produits disponibles',
                content: [
                    <>
                        <strong>Liste des Articles Disponibles</strong> - Explorez une "Liste des Articles
                        Disponibles" soigneusement sélectionnée que vous pouvez acheter avec vos points de
                        fidélité. Si votre solde est suffisant, vous pouvez choisir parmi différentes options
                        de récompense.
                    </>,
                    <>
                        <strong>Carte de Produit</strong> - Chaque "Carte de Produit" fournit des informations
                        détaillées sur un produit spécifique, présentant ses caractéristiques, avantages et
                        images, facilitant ainsi votre décision éclairée.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Rédemption. Produits échangés',
                content: [
                    <>
                        <strong>Échangé</strong> - Votre liste "Échangé" affiche les produits que vous avez
                        déjà achetés en utilisant vos points gagnés, avec des instructions sur la façon de les
                        recevoir. Profitez de vos récompenses !
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Suivi des tâches',
                content: [
                    <>
                        Optimisez rapidement vos récompenses avec notre <strong>Suivi de Tâches</strong>.
                        Suivez simplement notre widget de navigation pour les prochaines étapes, réalisez des
                        activités et accumulez des points. Restez à l'affût des nouvelles tâches pour
                        augmenter votre solde et débloquer des récompenses captivantes. Prêt à gagner plus ?
                        Passez à l'étape suivante dès maintenant !
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Fermer',
        finishBtn: 'Finition',
        nextBtn: 'Suivant',
        backBtn: 'Dos',
        startBtn: 'Commencer',
    };
};

const slidesPl = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Witamy w Programie Lojalnościowym!',
                content: [
                    <>
                        Dołącz do nas podczas wycieczki z przewodnikiem, podczas której dowiesz się, jak
                        zdobywać nagrody, odblokowując je wyłącznie korzyści i wzbogacaj swoje doświadczenia z
                        nami. Zdobywa punkty, które prowadzą do ekscytujących dodatkowe korzyści, takie jak
                        rabaty, wcześniejszy dostęp do wyprzedaży i specjalne oferty tylko dla członków.
                    </>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Główna nawigacja',
                content: [
                    <>
                        <strong>Strona Zdobądź Punkty</strong> to miejsce, gdzie znajdziesz różne dostępne
                        zadania i aktywności, które pozwalają zdobywać punkty lojalnościowe. Wykonuj te
                        zadania, aby gromadzić punkty i odblokować emocjonujące nagrody!
                    </>,
                    <>
                        Na stronie <strong>Wymiana</strong> znajdziesz kuszący wybór produktów i nagród, które
                        możesz wymienić na podstawie zdobytych punktów lojalnościowych. Spraw sobie
                        przyjemność albo oszczędzaj na coś wyjątkowego!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Prawe menu',
                content: [
                    <>
                        <strong>Saldo Punków</strong> - Śledź swoje gromadzone punkty w łatwy sposób dzięki
                        funkcji "Saldo Punków". Pokazuje ona twoje aktualne saldo w punktach lojalnościowych,
                        umożliwiając śledzenie nagród i planowanie ekscytujących wymian.
                    </>,
                    <>
                        <strong>Menu Lojalności</strong> - Zyskaj dostęp do wszystkich opcji i informacji
                        związanych z programem lojalnościowym w wygodnym "Menu Lojalności". To menu zapewnia
                        dostęp do historii twoich zdobyczy, umożliwiając przejrzenie wcześniejszych aktywności
                        oraz oferuje możliwość zarządzania ustawieniami konta, aby zapewnić spersonalizowane
                        doświadczenie.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Karta artykułu i zadania',
                content: [
                    <>
                        <strong>Karta Artykułu</strong> to informacyjna karta, która wyświetla dostępne
                        wydarzenia i odpowiadające im punkty. Przeglądając konkretną stronę artykułu, możesz
                        łatwo odkryć dodatkowe działania, które możesz podjąć, aby zdobyć punkty
                        lojalnościowe. Dowiedz się, jak zdobywać punkty, eksplorując konkretną stronę
                        artykułu.
                    </>,
                    <>
                        <strong>Zdarzenia Wymagane</strong> - Wykonaj te niezbędne zadania, aby oznaczyć kartę
                        jako ukończoną i zdobyć podstawowe punkty. Są to obowiązkowe działania, które
                        przyczyniają się do twojego postępu w programie lojalnościowym.
                    </>,
                    <>
                        <strong>Zdarzenia Opcjonalne</strong> - Idź na dodatkowy krok i zdobywaj dodatkowe
                        punkty, wykonując te opcjonalne zadania. Choć nie są one obowiązkowe, stanowią cenne
                        okazje do zdobycia punktów i odblokowania jeszcze bardziej ekscytujących nagród.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Rodzaje zadań',
                content: [
                    <>
                        <strong>Czytaj Artykuł</strong> - Zdobywaj punkty lojalności, po prostu czytając
                        określony artykuł. System nagrodzi cię za interakcję z treścią.
                    </>,
                    <>
                        <strong>Ikona Zegara</strong> - Zdobywaj punkty za czytanie artykułu, spędzając
                        wymaganą ilość czasu na stronie. System nagrodzi cię tylko po osiągnięciu określonego
                        progu czasowego. Śledzi on czas czytania, aby określić twoją nagrodę.
                    </>,
                    <>
                        <strong>Udostępnij</strong> - To zadanie polega na udostępnianiu ankiety, quizu,
                        badania lub widgetu z pytaniami na mediach społecznościowych. Kliknij przycisk
                        "Udostępnij" na widżecie, wykonaj go i zdobywaj punkty. Każda sieć społecznościowa ma
                        inną wartość punktową za udostępnianie.
                    </>,
                    <>
                        <strong>Wypełnij Kwestionariusz</strong> - Przygotuj się do otrzymywania nagród,
                        wypełniając różne kwestionariusze, w tym quizy, badania, ankiety i quizy. Każdy
                        ukończony kwestionariusz przyczynia się do gromadzenia punktów.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Odkupienie. Dostępne produkty',
                content: [
                    <>
                        <strong>Dostępna Lista</strong> - Odkryj starannie wybraną "Dostępną Listę" produktów,
                        które możesz zakupić za pomocą punktów lojalnościowych. Jeśli masz wystarczający stan
                        konta, możesz wybierać spośród różnych nagród.
                    </>,
                    <>
                        <strong>Karta Produktu</strong> - Każda "Karta Produktu" zawiera szczegółowe
                        informacje o konkretnym produkcie, prezentując jego cechy, korzyści i obrazki, co
                        ułatwia podjęcie świadomej decyzji.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Odkupienie. Odkupione produkty',
                content: [
                    <>
                        <strong>Wykorzystane</strong> - Twój "Wykorzystany" lista wyświetla produkty, które
                        już zakupiłeś za pomocą zdobytych punktów, wraz z instrukcjami, jak je odebrać. Ciesz
                        się swoimi nagrodami!
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Śledzenie zadań',
                content: [
                    <>
                        Szybko zmaksymalizuj swoje nagrody dzięki naszemu{' '}
                        <strong>modułowi śledzenia zadań</strong>. Po prostu podążaj za naszym widżetem
                        nawigacyjnym, aby zobaczyć kolejne kroki, ukończyć czynności i zdobyć punkty. Bądź
                        czujny na nowe zadania, aby zwiększyć saldo i odblokować ekscytujące nagrody. Gotowy
                        zarabiać więcej? Zrób kolejny krok już teraz!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Zamknąć',
        finishBtn: 'Skończyć',
        nextBtn: 'Następny',
        backBtn: 'Z powrotem',
        startBtn: 'Początek',
    };
};

const slidesRu = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Добро пожаловать в Программу Лояльности!',
                content: [
                    <>
                        Присоединяйтесь к нам в экскурсии, где вы узнаете, как зарабатывать награды, открывать
                        эксклюзивные преимущества и улучшать свои впечатления от сотрудничества с нами. Вы
                        зарабатываете баллы, которые дают вам такие замечательные привилегии, как скидки,
                        ранний доступ к распродажам и специальные предложения только для участников.
                    </>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Основная навигация',
                content: [
                    <>
                        <strong>Страница "Заработок"</strong> - это страница, на которой вы найдете
                        разнообразные задания и мероприятия, которые позволят вам зарабатывать баллы
                        лояльности. Выполняйте эти задания, чтобы накапливать баллы и разблокировать
                        увлекательные награды!
                    </>,
                    <>
                        На странице <strong>"Обмен баллов"</strong> вы найдете множество соблазнительных
                        товаров и наград, которые можно приобрести, используя заработанные баллы лояльности.
                        Порадуйте себя или накопите для особенного случая!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Правое меню',
                content: [
                    <>
                        <strong>Баланс баллов</strong> - Легко отслеживайте накопленные баллы с помощью
                        функции "Баланс баллов". Здесь отображается текущий баланс баллов лояльности, позволяя
                        вам следить за своими наградами и планировать увлекательные обмены.
                    </>,
                    <>
                        <strong>Меню лояльности</strong> - Получите доступ ко всем опциям и информации,
                        связанным с программой лояльности, удобно в меню "Меню лояльности". Это меню
                        предоставляет доступ к истории вашего заработка, позволяя вам просматривать прошлые
                        активности, а также предоставляет возможность управлять настройками вашей учетной
                        записи для персонализированного опыта.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Карточка статьи и задания',
                content: [
                    <>
                        <strong>Карточка статьи</strong> - это информационная карточка, на которой
                        отображаются доступные события и соответствующие баллы. При просмотре конкретной
                        страницы статьи вы можете легко изучить дополнительные действия, которые вы можете
                        выполнить, чтобы заработать баллы лояльности. Узнайте, как можно зарабатывать баллы,
                        изучая конкретную страницу статьи.
                    </>,
                    <>
                        <strong>Обязательные события</strong> - Выполните эти обязательные задания, чтобы
                        отметить карту как выполненную и заработать базовые баллы. Это обязательные действия,
                        которые способствуют вашему продвижению в программе лояльности.
                    </>,
                    <>
                        <strong>Дополнительные события</strong> - Пройдите дополнительный путь и заработайте
                        дополнительные баллы, выполнив эти дополнительные задания. Хотя они не обязательны,
                        они предоставляют ценные возможности увеличить ваши баллы и разблокировать еще более
                        захватывающие награды.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Типы задач',
                content: [
                    <>
                        <strong>Чтение статьи</strong> - Зарабатывайте баллы лояльности, просто читая
                        указанную статью. Система наградит вас за взаимодействие с контентом.
                    </>,
                    <>
                        <strong>Иконка таймера</strong> - Зарабатывайте баллы за чтение статьи, проводя
                        необходимое время на странице. Система наградит вас только после достижения
                        установленного времени. Она отслеживает продолжительность вашего чтения для
                        определения вашей награды.
                    </>,
                    <>
                        <strong>Поделиться</strong> - Это задание включает в себя размещение опроса,
                        викторины, опроса или викторины на социальных сетях. Нажмите кнопку "Поделиться" на
                        виджете, выполните его и заработайте баллы. Для каждой социальной сети установлена
                        своя стоимость баллов за размещение.
                    </>,
                    <>
                        <strong>Заполнить анкету</strong> - Готовьтесь к получению наград, выполняя различные
                        анкеты, включая тесты, опросы, опросы и викторины. Каждая завершенная анкета
                        способствует накоплению ваших баллов.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Искупление. Доступные продукты',
                content: [
                    <>
                        <strong>Список доступных товаров</strong> - Исследуйте подобранный "Список доступных
                        товаров", которые вы можете приобрести с использованием своих баллов лояльности. Если
                        у вас достаточный баланс, вы можете выбрать из различных вариантов вознаграждений.
                    </>,
                    <>
                        <strong>Карточка товара</strong> - Каждая "Карточка товара" предоставляет подробную
                        информацию о конкретном товаре, демонстрируя его характеристики, преимущества и
                        изображения, что облегчает принятие информированного решения.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Искупление. Погашенные продукты',
                content: [
                    <>
                        <strong>Использованные</strong> - Ваш список "Использованные" отображает товары,
                        которые вы уже приобрели, используя свои заработанные баллы, а также инструкции о том,
                        как их получить. Наслаждайтесь своими наградами!
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Task tracker',
                content: [
                    <>
                        Быстро получите максимальную выгоду с помощью нашего <strong>Трекера задач</strong>.
                        Просто следуйте нашему навигационному виджету, чтобы узнать следующие шаги, выполнить
                        задания и набрать баллы. Будьте готовы к новым заданиям, чтобы пополнить свой баланс и
                        разблокировать захватывающие награды. Готовы зарабатывать больше? Сделайте следующий
                        шаг прямо сейчас!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Зыкрыть',
        finishBtn: 'Закончить',
        nextBtn: 'Следующий',
        backBtn: 'Назад',
        startBtn: 'Начать',
    };
};

const slidesUk = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Ласкаво просимо до програми лояльності!',
                content: [
                    <>
                        Приєднуйтесь до нас у екскурсії, де ви дізнаєтеся, як заробити винагороди,
                        розблокувати ексклюзивні переваги та покращити свій досвід роботи з нами. Заробляйте
                        бали, які ведуть до захоплюючих бонусів, таких як знижки, ранній доступ до розпродажів
                        і спеціальні пропозиції лише для учасників.
                    </>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Головна навігація',
                content: [
                    <>
                        <strong>Сторінка "Зарабіток"</strong> - це сторінка, де ви знайдете різноманітні
                        завдання і активності, які дозволять вам заробляти бали лояльності. Виконуйте ці
                        завдання, щоб накопичувати бали і розблоковувати захоплюючі винагороди!
                    </>,
                    <>
                        На сторінці <strong>"Обмін балів"</strong>, ви знайдете спокусливий вибір товарів та
                        нагород, які ви можете обміняти за зароблені бали лояльності. Порадуйте себе або
                        заощаджуйте для чогось особливого!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Праве меню',
                content: [
                    <>
                        <strong>Баланс балів</strong> - Легко відстежуйте накопичені бали за допомогою функції
                        "Баланс балів". Це відображає ваш поточний баланс балів лояльності, дозволяючи вам
                        слідкувати за вашими винагородами і планувати захоплюючі обміни.
                    </>,
                    <>
                        <strong>Меню лояльності</strong> - Отримайте доступ до всіх опцій і інформації,
                        пов'язаної з програмою лояльності, зручно в меню "Меню лояльності". Це меню надає
                        доступ до вашої історії заробітку, дозволяючи вам переглядати минулі активності, а
                        також надає можливість керувати налаштуваннями вашого облікового запису для
                        персоналізованого досвіду.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Картка статті та завдання',
                content: [
                    <>
                        <strong>Картка статті</strong> - це інформаційна картка, на якій відображаються
                        доступні події та відповідні балі лояльності. Переглядаючи конкретну сторінку статті,
                        ви можете легко дізнатися про додаткові дії, які ви можете виконати для заробітку
                        балів лояльності. Дізнайтеся, як ви можете заробити бали, досліджуючи конкретну
                        сторінку статті.
                    </>,
                    <>
                        <strong>Обов'язкові події</strong> - Виконуйте ці обов'язкові завдання, щоб позначити
                        картку як завершену і заробити базові бали. Це обов'язкові дії, які сприяють вашому
                        прогресу в програмі лояльності.
                    </>,
                    <>
                        <strong>Необов'язкові події</strong> - Піднімайте планку і заробляйте додаткові бали,
                        виконуючи ці необов'язкові завдання. Вони не є обов'язковими, але надають цінні
                        можливості покращити ваші бали і розблокувати ще більше захоплюючих винагород.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Види завдань',
                content: [
                    <>
                        <strong>Читати статтю</strong> - Заробляйте бали лояльності, просто читаючи вказану
                        статтю. Система винагороджує вас за взаємодію з контентом.
                    </>,
                    <>
                        <strong>Іконка таймера</strong> - Заробляйте бали за читання статті, витрачаючи
                        встановлену кількість часу на сторінці. Система винагороджує вас тільки після
                        досягнення встановленого часового порогу. Вона відстежує тривалість вашого читання для
                        визначення вашої винагороди.
                    </>,
                    <>
                        <strong>Поділитися</strong> - Це завдання включає в себе розповідь опитування, тесту,
                        опиту або вікторини на соціальних мережах. Натисніть кнопку "Поділитися" на віджеті,
                        завершіть його та заробляйте бали. Кожна соціальна мережа має свою власну кількість
                        балів за розповідь.
                    </>,
                    <>
                        <strong>Заповнити опитування</strong> - Готуйтеся до отримання винагороди, заповнюючи
                        різні опитування, включаючи тести, опитування, опитування та вікторини. Кожне
                        завершене опитування сприяє накопиченню ваших балів.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Викуп. Доступні продукти',
                content: [
                    <>
                        <strong>Список доступних товарів</strong> - Досліджуйте підібраний "Список доступних
                        товарів", які ви можете придбати за допомогою своїх балів лояльності. Якщо ваш баланс
                        досить великий, ви можете вибрати з різних винагород.
                    </>,
                    <>
                        <strong>Картка товару</strong> - Кожна "Картка товару" надає детальну інформацію про
                        конкретний товар, демонструючи його характеристики, переваги та зображення, що спрощує
                        прийняття інформованого рішення.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Викуп. Викуплені продукти',
                content: [
                    <>
                        <strong>Redeemed</strong> - Your "Redeemed" list displays the products you've already
                        purchased using your earned points, along with instructions on how to receive them.
                        Enjoy your rewards!
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Трекер завдань',
                content: [
                    <>
                        Швидко максимізуйте свої винагороди за допомогою нашого{' '}
                        <strong>Відстеження завдань</strong>. Просто слідкуйте за нашим навігаційним віджетом
                        для наступних кроків, виконуйте завдання та накопичуйте бали. Стежте за новими
                        завданнями, щоб збільшити свій баланс і отримати захоплюючі винагороди. Готові
                        заробляти більше? Зробіть наступний крок зараз!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Закрити',
        finishBtn: 'Завершити',
        nextBtn: 'Наступний',
        backBtn: 'Назад',
        startBtn: 'Розпочати',
    };
};

const slidesPt = (theme: string): Slider => {
    return {
        slides: [
            {
                image: getImage('welcome.png', theme),
                title: 'Bem-vindo ao Programa de Fidelidade!',
                content: [
                    <>
                        Junte-se a nós em uma visita guiada onde você descobrirá como ganhar recompensas,
                        desbloquear benefícios exclusivos e melhorar sua experiência conosco. Você ganha
                        pontos que levam a vantagens interessantes, como descontos, acesso antecipado a vendas
                        e ofertas especiais somente para membros.
                    </>,
                ],
                isWelcome: true,
            },
            {
                image: getImage('main-menu.png', theme),
                title: '1. Navegação Principal',
                content: [
                    <>
                        <strong>Página de Pontuação</strong> é uma página onde você encontrará uma variedade
                        de tarefas disponíveis e atividades que permitem que você ganhe pontos de fidelidade.
                        Complete essas tarefas para acumular pontos e desbloquear recompensas emocionantes!
                    </>,
                    <>
                        Na <strong>página de Resgate</strong>, você descobrirá uma tentadora variedade de
                        itens e recompensas que você pode resgatar usando seus pontos de fidelidade ganhos.
                        Mime-se ou economize para algo especial!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('user-menu.png', theme),
                title: '2. Menu direito',
                content: [
                    <>
                        <strong>Saldo de Pontos</strong> - Acompanhe facilmente seus pontos acumulados com o
                        recurso "Saldo de Pontos". Isso mostra seu saldo atual em pontos de fidelidade,
                        permitindo que você acompanhe suas recompensas e planeje resgates emocionantes.
                    </>,
                    <>
                        <strong>Menu de Fidelidade</strong> - Acesse todas as opções e informações
                        relacionadas ao programa de fidelidade convenientemente no "Menu de Fidelidade". Este
                        menu fornece acesso ao seu histórico de ganhos, permitindo que você reveja atividades
                        passadas e também oferece a capacidade de gerenciar as configurações da sua conta para
                        uma experiência personalizada.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('article-card.png', theme),
                title: '3. Cartão de artigo e tarefas',
                content: [
                    <>
                        O <strong>Cartão de Artigo</strong> é um cartão informativo que exibe os eventos
                        disponíveis e seus valores correspondentes em pontos. Ao visualizar uma página de
                        artigo específica, você pode explorar facilmente ações adicionais que você pode
                        realizar para ganhar pontos de fidelidade. Descubra como você pode ganhar pontos
                        enquanto explora a página de artigo específica.
                    </>,
                    <>
                        <strong>Eventos Obrigatórios</strong> - Complete essas tarefas essenciais para marcar
                        o cartão como concluído e ganhe seus pontos base. Essas são ações obrigatórias que
                        contribuem para o seu progresso dentro do programa de fidelidade.
                    </>,
                    <>
                        <strong>Eventos Opcionais</strong> - Vá além e ganhe pontos adicionais ao completar
                        essas tarefas opcionais. Embora não sejam obrigatórias, elas apresentam oportunidades
                        valiosas para aumentar seus pontos e desbloquear recompensas ainda mais emocionantes.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tasks.png', theme),
                title: '4. Tipos de tarefas',
                content: [
                    <>
                        <strong>Ler Artigo</strong> - Ganhe pontos de fidelidade simplesmente lendo o artigo
                        especificado. O sistema irá recompensá-lo por se envolver com o conteúdo.
                    </>,
                    <>
                        <strong>Ícone do Cronômetro</strong> - Ganhe pontos por ler um artigo ao gastar o
                        tempo necessário na página. O sistema irá recompensá-lo somente depois de atingir o
                        limite de tempo especificado. Ele acompanha a duração da sua leitura para determinar
                        sua recompensa.
                    </>,
                    <>
                        <strong>Compartilhar</strong> - Esta tarefa envolve compartilhar uma enquete, quiz,
                        pesquisa ou widget de trivia nas redes sociais. Clique no botão "Compartilhar" no
                        widget, complete-o e ganhe pontos. Cada rede social possui um valor de pontos
                        diferente para o compartilhamento.
                    </>,
                    <>
                        <strong>Completar Questionário</strong> - Prepare-se para receber recompensas
                        completando vários questionários, incluindo quizzes, pesquisas, enquetes e trivia.
                        Cada questionário completo contribui para a acumulação de seus pontos.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-available.png', theme),
                title: '5. Redenção. Produtos disponíveis',
                content: [
                    <>
                        <strong>Lista Disponível</strong> - Explore uma "Lista Disponível" cuidadosamente
                        elaborada de produtos que você pode comprar usando seus pontos de fidelidade. Se o seu
                        saldo for suficiente, você pode escolher entre várias opções gratificantes.
                    </>,
                    <>
                        <strong>Cartão de Produto</strong> - Cada "Cartão de Produto" fornece informações
                        detalhadas sobre um produto específico, mostrando seus recursos, benefícios e imagens,
                        tornando mais fácil para você tomar uma decisão informada.
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('redemption-redeemed.png', theme),
                title: '6. Redenção. Produtos resgatados',
                content: [
                    <>
                        <strong>Resgatados</strong> - Sua lista de "Resgatados" exibe os produtos que você já
                        comprou usando seus pontos ganhos, juntamente com instruções sobre como recebê-los.
                        Aproveite suas recompensas!
                    </>,
                ],
                isWelcome: false,
            },
            {
                image: getImage('tracker.png', theme),
                title: '7. Rastreador de tarefas',
                content: [
                    <>
                        Maximize suas recompensas rapidamente com nosso <strong>Task Tracker</strong>. Basta
                        seguir nosso widget de navegação para as próximas etapas, concluir atividades e
                        acumular pontos. Fique atento a novas tarefas para aumentar seu equilíbrio e
                        desbloquear recompensas emocionantes. Pronto para ganhar mais? Dê o próximo passo
                        agora!
                    </>,
                    <br></br>,
                ],
                isWelcome: false,
            },
        ],
        closeBtn: 'Fechar',
        finishBtn: 'Terminar',
        nextBtn: 'Próximo',
        backBtn: 'Voltar',
        startBtn: 'Começar',
    };
};
