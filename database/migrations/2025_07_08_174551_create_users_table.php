<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
public function up(): void
{
Schema::create('users', function (Blueprint $table) {
$table->id();
$table->string('name');
$table->string('email')->unique();
$table->timestamp('email_verified_at')->nullable();
$table->string('password');
$table->rememberToken();
$table->timestamps();

$table->string('bio')->nullable();
$table->string('phone')->nullable();
$table->string('avatar')->nullable();
$table->boolean('is_active')->default(true);
$table->timestamp('deactivated_at')->nullable();
$table->string('deactivation_reason')->nullable();
$table->timestamp('last_login')->nullable();
$table->date('birthday')->nullable();
});
}

public function down(): void
{
Schema::dropIfExists('users');
}
};