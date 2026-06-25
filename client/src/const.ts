export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  // OAuth não configurado (rodando fora da plataforma Manus). Retorna um
  // fallback inerte para não lançar "Invalid URL" durante a renderização.
  if (!oauthPortalUrl || !appId) {
    console.warn(
      "[auth] OAuth não configurado: defina VITE_OAUTH_PORTAL_URL e VITE_APP_ID no .env para habilitar o login."
    );
    return "#";
  }

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
