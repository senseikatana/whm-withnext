"use client";

import { Loader2, Lock, Mail, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../lib/auth-context";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
	const { login, register } = useAuth();
	const [mode, setMode] = useState<"login" | "register">("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [verificationSent, setVerificationSent] = useState(false);

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			if (mode === "login") {
				const result = await login(email, password);
				if (result.error) {
					setError(result.error);
				} else {
					onClose();
					resetForm();
				}
			} else {
				const result = await register(email, password, name);
				if (result.error) {
					setError(result.error);
				} else {
					setVerificationSent(true);
				}
			}
		} catch {
			setError("Error inesperado");
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEmail("");
		setPassword("");
		setName("");
		setError(null);
		setVerificationSent(false);
	};

	return (
		<div className="fixed inset-0 bg-[#050811]/85 backdrop-blur-xs flex items-center justify-center z-50 p-4">
			<div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-lg font-bold text-white">
						{mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
					</h2>
					<button
						type="button"
						onClick={() => {
							onClose();
							resetForm();
						}}
						className="text-slate-400 hover:text-white transition"
					>
						<X size={20} />
					</button>
				</div>

				{verificationSent ? (
					<div className="text-center py-8">
						<Mail size={48} className="text-indigo-400 mx-auto mb-4" />
						<h3 className="text-white font-bold mb-2">Verifica tu email</h3>
						<p className="text-slate-400 text-sm mb-4">
							Hemos enviado un código de verificación a <span className="text-indigo-400">{email}</span>
						</p>
						<button
							type="button"
							onClick={() => {
								setMode("login");
								setVerificationSent(false);
							}}
							className="text-indigo-400 text-sm hover:underline"
						>
							Volver a iniciar sesión
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						{mode === "register" && (
							<div>
								<label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
									Nombre
								</label>
								<div className="relative">
									<User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Tu nombre"
										className="w-full bg-[#050811] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500"
									/>
								</div>
							</div>
						)}

						<div>
							<label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
								Email
							</label>
							<div className="relative">
								<Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="tu@email.com"
									required
									className="w-full bg-[#050811] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
								Contraseña
							</label>
							<div className="relative">
								<Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									required
									minLength={6}
									className="w-full bg-[#050811] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500"
								/>
							</div>
						</div>

						{error && (
							<div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-sm text-rose-400">
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
						>
							{loading ? (
								<Loader2 size={18} className="animate-spin" />
							) : mode === "login" ? (
								"Iniciar Sesión"
							) : (
								"Crear Cuenta"
							)}
						</button>

						<div className="text-center">
							<button
								type="button"
								onClick={() => {
									setMode(mode === "login" ? "register" : "login");
									setError(null);
								}}
								className="text-slate-400 text-sm hover:text-indigo-400 transition"
							>
								{mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
