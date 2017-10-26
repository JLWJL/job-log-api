const jwt = require('jsonwebtoken');
const jwtConfig = require('./config').jwtConfig;
const MemoryCache = require('fast-memory-cache');

const BlackList = new MemoryCache();

const EXPIRATION = 3600*72; //3 days

const JWT_INVOKED = 0;
const JWT_VALID 	= 1;
const JWT_EXPIRED = 2;
const JWT_INVALID = 3;


/**
 * Return jwt token 
 */
exports.sign = function sign(payload){
	let token = jwt.sign(
		{userId:payload.user_id},
		jwtConfig.SECRET,
		{expiresIn:'3 days'}
	);
	return token;
}


/**
 * Invalid a token
 */
exports.invoke = function invoke(token){
	BlackList.set(token,'invoked', EXPIRATION);
}


/**
 * Verify a token
 */
exports.verify = function verify(token, done){
	if(!isInvoked(token)){
		jwt.verify(token, jwtConfig.SECRET, done);

	}else{
		done()
	}
}


exports.isInvoked = isInvoked = function isInvoked(token){
	return BlackList.get(token)!==undefined;
}