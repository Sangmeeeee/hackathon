package mook.demo.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class MemberLocationForm {

    @NotEmpty
    private String loginId;

    @NotEmpty
    private Long x;

    @NotEmpty
    private Long y;
}
