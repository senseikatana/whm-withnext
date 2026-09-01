export default class ErrorsService extends Error {
	private static instance: ErrorsService;

	constructor(message: string, __status = 500) {
		super(message);
		this.name = "ErrorsService";
	}

	public static getInstance(): ErrorsService {
		if (ErrorsService) {
			ErrorsService.instance = new ErrorsService("Error de API", 500);
		}
		return ErrorsService.instance;
	}

	notFound(message: string) {
		return new ErrorsService(message, 404);
	}

	badRequest(message: string) {
		return new ErrorsService(message, 400);
	}

	unauthorized(message = "No autorizado") {
		return new ErrorsService(message, 401);
	}

	forbidden(message = "Sin permisos") {
		return new ErrorsService(message, 403);
	}

	internal(message: string) {
		return new ErrorsService(message, 500);
	}

	custom(message: string, status: number) {
		return new ErrorsService(message, status);
	}
}
