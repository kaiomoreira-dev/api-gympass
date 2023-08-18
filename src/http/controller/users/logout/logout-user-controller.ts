import { FastifyReply, FastifyRequest } from 'fastify'

export async function Logout (request: FastifyRequest, reply:FastifyReply){
	request.jwtVerify({onlyCookie: true})

	// pegar refresh tokens
	const refreshToken = request.cookies

	// enviar refreshToken no usecase para buscar no banco o refreshToken
	// e expira-lo alterando a data de expiração

	// criar novo access token para invalidar ultimo
		const token = await reply.jwtSign(
			{},
			{
			sign: {
				sub: request.user.sub,
			}
			}
		) 
			
		return reply.status(204).send()
}
    
