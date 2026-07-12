use crate::auth::register::{__path_mnemonic, __path_register};
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(paths(mnemonic, register))]
pub struct ApiDoc;
