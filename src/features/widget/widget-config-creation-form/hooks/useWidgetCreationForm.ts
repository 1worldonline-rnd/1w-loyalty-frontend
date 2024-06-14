import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { userModel } from '@/entities/user';
import { widgetConfigModel } from '@/entities/widget-config';
import { showMessage } from '@/shared/lib/messages';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { adminPanelModel } from '@/entities/admin-panel';

export const pointsBalanceWidgetLocales = {
    en: {
        'link-to-loyalty': 'Go to my Profile',
        'open-settings-button': 'Open settings',
        'close-settings-button': 'Close settings',
        'link-to-manage-account': 'Manage account',
        title: 'Hello 👋 and welcome to Loyalty Program',
        description:
            'This program allows you to earn cryptocurrency for performing various actions on the site.',
        'welcome-link-to-loyalty': 'I want to join',
        'powered-by': 'Powered by',
        '1World-Online': '1World Online',
        points: 'Points',
        'register-message': 'Register an account to start using them',
        'you-earned': 'You earned',
        'no-name': 'No name',
    },
    ru: {
        'link-to-loyalty': 'Перейти в мой профиль',
        'open-settings-button': 'Открыть настройки',
        'close-settings-button': 'Закрыть настройки',
        'link-to-manage-account': 'Управлять аккаунтом',
        title: 'Здравствуйте 👋 и добро пожаловать в программу лояльности',
        description:
            'Эта программа позволяет зарабатывать криптовалюту за выполнение различных действий на сайте.',
        'welcome-link-to-loyalty': 'Я хочу присоединиться',
        'powered-by': 'Powered by',
        '1World-Online': '1World Online',
        points: 'Монеты',
        'register-message': 'Зарегистрируйте аккаунт, чтобы начать их использовать',
        'you-earned': 'Вы заработали',
        'no-name': 'Без имени',
    },
    de: {
        'link-to-loyalty': 'Zu meinem Profil gehen',
        'open-settings-button': 'Einstellungen öffnen',
        'close-settings-button': 'Einstellungen schließen',
        'link-to-manage-account': 'Konto verwalten',
        title: 'Hallo 👋 und willkommen beim Treueprogramm',
        description:
            'Mit diesem Programm können Sie Kryptowährung verdienen, um verschiedene Aktionen auf der Website auszuführen.',
        'welcome-link-to-loyalty': 'Ich möchte beitreten',
        'powered-by': 'Powered by',
        '1World-Online': '1World Online',
        points: 'Punkte',
        'register-message': 'Registrieren Sie ein Konto, um sie zu verwenden',
        'you-earned': 'Du hast verdient',
        'no-name': 'Kein Name',
    },
    es: {
        'link-to-loyalty': 'Ir a mi perfil',
        'open-settings-button': 'Configuración abierta',
        'close-settings-button': 'Cerrar configuración',
        'link-to-manage-account': 'Administrar cuenta',
        title: 'Hola 👋 y bienvenido al programa de lealtad',
        description: 'Este programa le permite ganar criptomonedas por realizar varias acciones en el sitio.',
        'welcome-link-to-loyalty': 'Quiero unirme',
        'powered-by': 'Powered by',
        '1World-Online': '1World Online',
        points: 'Puntos',
        'register-message': 'Registra una cuenta para empezar a usarlos.',
        'you-earned': 'Usted ganó',
        'no-name': 'Sin nombre',
    },
    fr: {
        'link-to-loyalty': 'Mon profil',
        'open-settings-button': 'Ouvrir les paramètres',
        'close-settings-button': 'Fermer les paramètres',
        'link-to-manage-account': 'Gérer son compte',
        title: 'Bonjour 👋 et bienvenue au programme de fidélité',
        description:
            'Ce programme vous permet de gagner des points de fidélité en effectuant diverses actions sur le site.',
        'welcome-link-to-loyalty': 'Je veux participer',
        'powered-by': 'Propulsé par',
        '1World-Online': '1World Online',
        points: 'Points',
        'register-message': 'Créez votre compte pour commencer à les utiliser',
        'you-earned': 'Tu as obtenu',
        'no-name': 'Sans nom',
    },
    pl: {
        'link-to-loyalty': 'Przejdź do mojego profilu',
        'open-settings-button': 'Otwórz ustawienia',
        'close-settings-button': 'Zamknij ustawienia',
        'link-to-manage-account': 'Zarządzać kontem',
        title: 'Witam 👋 i witamy w Programie Lojalnościowym',
        description: 'Ten program pozwala zarabiać kryptowalutę za wykonywanie różnych czynności na stronie.',
        'welcome-link-to-loyalty': 'Chcę dołączyć',
        'powered-by': 'Powered by',
        '1World-Online': '1World Online',
        points: 'Zwrotnica',
        'register-message': 'Zarejestruj konto, aby zacząć z nich korzystać',
        'you-earned': 'Zarobiłeś',
        'no-name': 'Bez nazwy',
    },
    pt: {
        'link-to-loyalty': 'Ir para o meu perfil',
        'open-settings-button': 'Abrir configurações',
        'close-settings-button': 'Fechar configurações',
        'link-to-manage-account': 'Gerenciar conta',
        title: 'Olá 👋 e bem vindo ao Programa de Fidelidade',
        description: 'Este programa permite que você ganhe criptomoedas por realizar várias ações no site.',
        'welcome-link-to-loyalty': 'Eu quero me juntar',
        'powered-by': 'Powered by',
        '1World-Online': '1World Online',
        points: 'Pontos',
        'register-message': 'Registre uma conta para começar a usá-los',
        'you-earned': 'Você ganhou',
        'no-name': 'Sem nome',
    },
    uk: {
        'link-to-loyalty': 'Перейти до мого профілю',
        'open-settings-button': 'Відкрити налаштування',
        'close-settings-button': 'Закрити налаштування',
        'link-to-manage-account': 'Керувати акаунтом',
        title: 'Привіт 👋 і ласкаво просимо до програми лояльності',
        description: 'Ця програма дозволяє заробляти криптовалюту за виконання різних дій на веб-сайті.',
        'welcome-link-to-loyalty': 'Я хочу приєднатися',
        'powered-by': 'Powered by',
        '1World-Online': '1World Online',
        points: 'Монети',
        'register-message': 'Зареєструйте обліковий запис, щоб почати їх використовувати',
        'you-earned': 'Ви заробили',
        'no-name': 'Без імені',
    },
};

type Options = Array<
    {
        label: string;
        value: string;
    } & Record<string, unknown>
>;

export const useWidgetCreationForm = () => {
    // const partnerId = useStore(userModel.stores.$partnerId);
    const loyaltyPartner = useStore(userModel.stores.$loyaltyPartner);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });

    const { validationMessages } = useLocalizedYupValidations();

    const englishLocale = {
        label: i18n.t('en'),
        value: 'en',
    };

    const localeOptions: Options = [
        { label: i18n.t('uk'), value: 'uk' },
        englishLocale,
        { label: i18n.t('fr'), value: 'fr' },
        { label: i18n.t('de'), value: 'de' },
        { label: i18n.t('es'), value: 'es' },
        { label: i18n.t('pt'), value: 'pt' },
        { label: i18n.t('pl'), value: 'pl' },
        { label: i18n.t('ru'), value: 'ru' },
    ];

    const validationSchema = Yup.object({
        widgetName: Yup.string()
            .trim()
            .max(50, validationMessages.maxCharacters(50))
            .required(validationMessages.required),
        pointName: Yup.string()
            .trim()
            .max(50, validationMessages.maxCharacters(50))
            .required(validationMessages.required),
    });

    const form = useFormik({
        initialValues: {
            widgetName: '',
            pointName: '',
            locale: englishLocale,
        },
        onSubmit: async ({ widgetName, pointName, locale: localeOption }) => {
            if (loyaltyPartner) {
                const { status } = await widgetConfigModel.effects.createWidgetConfigFx({
                    locale: localeOption.value,
                    name: widgetName.trim(),
                    hideWallet: false,
                    partner: {
                        guid: loyaltyPartner.externalId,
                        id: loyaltyPartner.id,
                        name: loyaltyPartner.name,
                    },
                    socialMedia: {},
                    tracker: {
                        offset: { horizontalOffset: 20, verticalOffset: 20 },
                        pointsName: pointName.trim(),
                        redirectUrl: '',
                    },
                    settings: {
                        imageLogo: '',
                        widgetColor: '',
                        lightBgColor: '#FFFFFF',
                        darkBgColor: '#252A32',
                        theme: 'light',
                        fontFamily: 'Manrope',
                        headerTitle:
                            pointsBalanceWidgetLocales[
                                localeOption.value as keyof typeof pointsBalanceWidgetLocales
                            ].title,
                        description:
                            pointsBalanceWidgetLocales[
                                localeOption.value as keyof typeof pointsBalanceWidgetLocales
                            ].description,
                        margin: '0',
                        logoLetterFontSize: '15',
                        logoLetterFontFamily: 'Monrope',
                        logoPointLetter: '',
                        logoPointIcon: 'EmptyCircleIcon',
                        logoPointSrc: '',
                    },
                    userMenuSettings: {
                        isShowHome: true,
                        isShowAccountSettings: true,
                        isShowActivityHistory: true,
                        isShowProductTour: true,
                        isShowLogout: true,
                    },
                });

                if (status === 200) {
                    showMessage(t('message-if-widget-successfully-created'));

                    adminPanelModel.events.adminModalToggled({
                        isOpen: false,
                    });
                }
            }
        },
        validationSchema,
    });

    return { form, localeOptions };
};
