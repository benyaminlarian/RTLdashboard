import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({

    rtlActive: false,

    ripple: false,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'lara-light-indigo',
    scale: 14,
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {

    const changeRtl = () => { 
        layoutConfig.rtlActive = !layoutConfig.rtlActive
    };

    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
    };

    const setScale = (scale) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), changeRtl , changeThemeSettings, setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem };
}
