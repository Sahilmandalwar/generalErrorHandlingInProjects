
userSchema.pre("save",async function(next){
    if(!this.modified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIN: process.env.JWT_EXPIRE,
    })
}

userSchema.methods.comparePassword=async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetPasswordToken = function() {            // userSchema must contain   
    const resetToken = crypto.randomBytes(20).toString("hex");     // resetPasswordExpire: Date
    // hasing and adding resetPasswordToken to userSchema          // resetPasswordToken: String
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000; // 15 minutes

    return resetToken;
}
