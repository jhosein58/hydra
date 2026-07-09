use crate::auth::register::__path_mnemonic;
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(paths(mnemonic,))]
pub struct ApiDoc;
