package mook.demo.api;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import mook.demo.apiresult.ApiResponseMessage;
import mook.demo.domain.Member;
import mook.demo.dto.LoginIdForm;
import mook.demo.dto.MemberLocationForm;
import mook.demo.repository.MemberRepository;
import org.springframework.data.util.Pair;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberRepository memberRepository;


//    /**
//     * 유저 좌표 수정
//     * @param memberLocationForm
//     * @return
//     */
//    @PostMapping("/api/member/location")
//    public ApiResponseMessage setLocation(@RequestBody MemberLocationForm memberLocationForm){
//        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
//        String loginId = memberLocationForm.getLoginId();
//
//        Optional<Member> memberByLoginId = memberRepository.findMemberByLoginId(loginId);
//
//        memberByLoginId.get().setLocationX(memberLocationForm.getX());
//        memberByLoginId.get().setLocationY(memberLocationForm.getY());
//        memberRepository.save(memberByLoginId.get());
//
//        apiResponseMessage.setMessage("좌표 수정 성공");
//        apiResponseMessage.setStatus("success");
//
//        return apiResponseMessage;
//    }
//
//    /**
//     * 유저 좌표 값 받아오기
//     * @param loginId
//     * @return
//     */
//    @GetMapping("/api/member/location")
//    public LocationForm getLocation(@RequestBody LoginIdForm loginId){
//        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
//
//        String id = loginId.getLoginId();
//        Optional<Member> memberByLoginId = memberRepository.findMemberByLoginId(id);
//
//        LocationForm locationForm = new LocationForm();
//        locationForm.setX(memberByLoginId.get().getLocationX());
//        locationForm.setY(memberByLoginId.get().getLocationY());
//
//        return locationForm;
//    }

    /**
     * 회원 가입
     * @param member
     * @param result
     * @return
     */
    @PostMapping("/api/member/add")
    public ApiResponseMessage save(@Valid @RequestBody Member member, BindingResult result){

        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();

        System.out.println("result = " + result);

        // loginId가 중복인가?
        if (isDuplicatedLoginId(member.getLoginId())){
            apiResponseMessage.setErrorMessage("duplicated loginId");
            apiResponseMessage.setErrorMessage("중복된 아이디가 있습니다.");
            return apiResponseMessage;
        }
        // name이 중복인가?
        if (isDuplicatedName(member.getName())){
            apiResponseMessage.setErrorMessage("duplicated name");
            apiResponseMessage.setErrorMessage("중복된 이름이 있습니다.");
            return apiResponseMessage;
        }

        if (result.hasErrors()) {
            apiResponseMessage.setStatus("failed");
            apiResponseMessage.setErrorMessage(result.toString());
//            apiResponseMessage.setErrorMessage("회원가입을 하는 도중 오류가 발생했습니다.");
//            apiResponseMessage.setE?
            return apiResponseMessage;
        }

//        member.setLocationX(0L);
//        member.setLocationY(0L);

        memberRepository.save(member);
        apiResponseMessage.setStatus("success");
        apiResponseMessage.setMessage("회원가입을 성공적으로 완료했습니다.");
        return apiResponseMessage;
    }

    public Boolean isDuplicatedLoginId(String loginId){
        Optional<Member> memberByLoginId = memberRepository.findMemberByLoginId(loginId);
        if (memberByLoginId.isEmpty()){
            return false;
        }
        return true;
    }

    public Boolean isDuplicatedName(String name){
        Optional<Member> memberByName = memberRepository.findMemberByName(name);
        if(memberByName.isEmpty()) {
            return false;
        }
        return true;
    }

    @Data
    static class CreateMemberRequest{
        private String name;
    }

    @Data
    static class CreateMemberResponse{
        private Long id;

        public CreateMemberResponse(Long id){
            this.id = id;
        }
    }

}

