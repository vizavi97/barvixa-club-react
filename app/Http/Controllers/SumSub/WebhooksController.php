<?php


namespace App\Http\Controllers\SumSub;


use App\Http\Controllers\Controller;
use App\Models\SumsubMessage;

class WebhooksController extends Controller
{

    public function applicantCreated(){
        try {
            SumsubMessage::create(['method' => 'applicantCreated','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantCreated error');
        }
    }
    public function applicantPending(){
        try {
            SumsubMessage::create(['method' => 'applicantPending','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantPending error');
        }
    }
    public function applicantReviewed(){
        try {
            SumsubMessage::create(['method' => 'applicantReviewed','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantReviewed error');
        }
    }
    public function applicantOnHold(){
        try {
            SumsubMessage::create(['method' => 'applicantOnHold','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantOnHold error');
        }
    }
    public function applicantActionPending(){
        try {
            SumsubMessage::create(['method' => 'applicantActionPending','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantActionPending error');
        }
    }
    public function applicantActionReviewed(){
        try {
            SumsubMessage::create(['method' => 'applicantActionReviewed','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantActionReviewed error');
        }
    }
    public function applicantActionOnHold(){
        try {
            SumsubMessage::create(['method' => 'applicantActionOnHold','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantActionOnHold error');
        }
    }
    public function applicantPrechecked(){
        try {
            SumsubMessage::create(['method' => 'applicantPrechecked','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantPrechecked error');
        }
    }
    public function applicantDeleted(){
        try {
            SumsubMessage::create(['method' => 'applicantDeleted','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantDeleted error');
        }
    }
    public function applicantReset(){
        try {
            SumsubMessage::create(['method' => 'applicantReset','message' => json_encode(request())]);
        } catch (\Exception $e) {
            \Log::error('applicantReset error');
        }
    }
}
