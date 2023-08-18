import { FastifyReply, FastifyRequest } from 'fastify'

export async function RefreshToken(request: FastifyRequest, reply:FastifyReply){
	request.jwtVerify({onlyCookie: true})

	const {role} = request.user

	const token = await reply.jwtSign(
		{
			role
		},
		{
			sign: {
				sub: request.user.sub
			}
		}
	)

	const refreshToken = await reply.jwtSign(
		{
			role
		},
		{
			sign: {
				sub: request.user.sub,
				expiresIn: '7d'

			}
		}
	)

	return reply
	.setCookie('refreshToken', refreshToken,{
		httpOnly:true,
		sameSite: true,
		path: '/',
		secure: true
	})
	.status(200)
	.send({token})

}



